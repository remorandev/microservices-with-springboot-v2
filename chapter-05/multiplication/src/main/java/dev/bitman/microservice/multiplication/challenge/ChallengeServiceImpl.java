package dev.bitman.microservice.multiplication.challenge;

import dev.bitman.microservice.multiplication.user.User;
import org.springframework.stereotype.Service;

@Service
public class ChallengeServiceImpl implements ChallengeService {
    @Override
    public ChallengeAttempt verifyAttempt(ChallengeAttemptDTO attemptDTO) {
        // Check if the attempt is correct
        boolean isCorrect = attemptDTO.getGuess() == attemptDTO.getFactorA() *  attemptDTO.getFactorB();

        // We don't use identifiers for now
        User user = new User(null, attemptDTO.getUserAlias());

        // Builds the domain object. Null id for now.
        ChallengeAttempt checkedAttempt = new ChallengeAttempt(null,
                user,
                attemptDTO.getFactorA(),
                attemptDTO.getFactorB(),
                attemptDTO.getGuess(),
                isCorrect
                );

        return checkedAttempt;
    }
}
