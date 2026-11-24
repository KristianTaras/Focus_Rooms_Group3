package hr.algebra.repository;

import hr.algebra.model.Profile;
import hr.algebra.model.Subject;
import hr.algebra.model.User;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class ProfileRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private EntityManager entityManager;

    // ---------- helpers ----------

    private User saveUser(String email, String username) {
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPasswordHash("hash-not-used-in-this-test");
        return userRepository.save(user);
    }

    private Profile newProfile(User user, String firstName, String lastName) {
        Profile profile = new Profile();
        profile.setUser(user);
        profile.setFirstName(firstName);
        profile.setLastName(lastName);
        profile.setStudyProgram("Software Engineering");
        profile.setStudyYear(2);
        return profile;
    }

    private Subject newSubject(String name) {
        Subject subject = new Subject();
        subject.setName(name);
        return subject;
    }

    private void flushAndClear() {
        entityManager.flush();
        entityManager.clear();
    }

    // ---------- profile ----------

    @Test
    void profile_isStoredWithTheUserIdAsKey() {
        User user = saveUser("emma.wilson@example.com", "emma_w");
        profileRepository.save(newProfile(user, "Emma", "Wilson"));
        flushAndClear();

        Profile found = profileRepository.findById(user.getId()).orElseThrow();

        assertThat(found.getId()).isEqualTo(user.getId());
        assertThat(found.getUser().getEmail()).isEqualTo("emma.wilson@example.com");
        assertThat(found.getFirstName()).isEqualTo("Emma");
        assertThat(found.getLastName()).isEqualTo("Wilson");
        assertThat(found.getStudyProgram()).isEqualTo("Software Engineering");
        assertThat(found.getStudyYear()).isEqualTo(2);
    }

    // ---------- subjects ----------

    @Test
    void subjectName_mustBeUnique() {
        subjectRepository.saveAndFlush(newSubject("Databases"));

        assertThatThrownBy(() -> subjectRepository.saveAndFlush(newSubject("Databases")))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    // ---------- user-subject relation (n:m) ----------

    @Test
    void userCanHaveManySubjects_andSubjectCanHaveManyUsers() {
        Subject databases = subjectRepository.save(newSubject("Databases"));
        Subject web = subjectRepository.save(newSubject("Web technologies"));

        User emma = saveUser("emma.wilson@example.com", "emma_w");
        User james = saveUser("james.carter@example.com", "james_c");

        Profile emmaProfile = newProfile(emma, "Emma", "Wilson");
        emmaProfile.getSubjects().add(databases);
        emmaProfile.getSubjects().add(web);

        Profile jamesProfile = newProfile(james, "James", "Carter");
        jamesProfile.getSubjects().add(databases);

        profileRepository.saveAll(List.of(emmaProfile, jamesProfile));
        flushAndClear();

        Profile reloaded = profileRepository.findById(emma.getId()).orElseThrow();
        assertThat(reloaded.getSubjects())
                .extracting(Subject::getName)
                .containsExactlyInAnyOrder("Databases", "Web technologies");

        Long usersWithDatabases = entityManager
                .createQuery("select count(p) from Profile p join p.subjects s where s.name = :name", Long.class)
                .setParameter("name", "Databases")
                .getSingleResult();
        assertThat(usersWithDatabases).isEqualTo(2L);
    }

    @Test
    void removingASubjectFromTheProfile_keepsTheSubject() {
        Subject databases = subjectRepository.save(newSubject("Databases"));
        User emma = saveUser("emma.wilson@example.com", "emma_w");

        Profile profile = newProfile(emma, "Emma", "Wilson");
        profile.getSubjects().add(databases);
        profileRepository.save(profile);
        flushAndClear();

        Profile loaded = profileRepository.findById(emma.getId()).orElseThrow();
        loaded.getSubjects().clear();
        flushAndClear();

        assertThat(profileRepository.findById(emma.getId()).orElseThrow().getSubjects()).isEmpty();
        assertThat(subjectRepository.findByName("Databases")).isPresent();
    }
}
