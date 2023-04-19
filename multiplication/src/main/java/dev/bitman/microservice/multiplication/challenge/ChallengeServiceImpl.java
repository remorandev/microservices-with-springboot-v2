package dev.bitman.microservice.multiplication.challenge;

import dev.bitman.microservice.multiplication.user.User;
import dev.bitman.microservice.multiplication.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChallengeServiceImpl implements ChallengeService {
    private final UserRepository userRepository;
    private final ChallengeAttemptRepository attemptRepository;

    @Override
    public ChallengeAttempt verifyAttempt(ChallengeAttemptDTO attemptDTO) {
        // Revision si el usuario existe
        User user = userRepository.findByAlias(attemptDTO.getUserAlias())
                .orElseGet(() -> {
                    log.info("Creating new user with alias {}",
                            attemptDTO.getUserAlias());
                    return userRepository.save(
                            new User(attemptDTO.getUserAlias())
                    );
                });

        // Revision si el intento es correcto
        boolean isCorrect = attemptDTO.getGuess() == attemptDTO.getFactorA() * attemptDTO.getFactorB();

        // Construccion del objeto de dominio, el id es NULL porque la BD lo genera
        ChallengeAttempt checkedAttempt = new ChallengeAttempt(null,
                user,
                attemptDTO.getFactorA(),
                attemptDTO.getFactorB(),
                attemptDTO.getGuess(),
                isCorrect
                );

        // Guardado de intento
        ChallengeAttempt storedAttempt = attemptRepository.save(checkedAttempt);

        return storedAttempt;
    }

    @Override
    public List<ChallengeAttempt> getStatsForUser(String userAlias) {
        return attemptRepository.findTop10ByUserAliasOrderByIdDesc(userAlias);
    }
}
