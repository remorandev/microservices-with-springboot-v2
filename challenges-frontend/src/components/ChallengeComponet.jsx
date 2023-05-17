import React from "react";
import ApiClient from "../services/ApiClient";
import LastAttemptsComponent from "./LastAttemptsComponent";

const initialState = {
    a: '', b: '',
    user: '',
    message: '',
    guess: 0,
    lastAttempts: [],
  };
  

class ChallengeComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = initialState;
        this.handleSubmitResult = this.handleSubmitResult.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.refreshChallenge();
    }

    refreshChallenge() {
        ApiClient.challenge().then(
            res => {
                console.log(res);
                if (res.ok) {
                    res.json().then(json => {
                        this.setState({
                            a: json.factorA,
                            b: json.factorB
                        });
                    });
                } else {
                    this.updateMessage("Can't reach the server");
                }
            }
        );
    }

    handleChange(event) {
        const name = event.target.name;
        console.log("name: " + event.target.value);
        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmitResult(event) {
        event.preventDefault();
        ApiClient.sendGuess(this.state.user, this.state.a, this.state.b, this.state.guess)
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        if (json.correct) {
                            this.updateMessage("Congratulations! Your guess is correct");
                        } else {
                            this.updateMessage("Oops! Your guess " + json.resultAttempt +
                                " is wrong, but keep playing!");
                        }
                        this.updateLastAttempts(this.state.user);
                        this.refreshChallenge();
                    });
                } else {
                    this.updateMessage("Error: server error or not available")
                }
            });
    }

    updateMessage(message) {
        this.setState({
            message: message
        });
    }

    updateLastAttempts(userAlias) {
        ApiClient.getAttempts(userAlias).then(res => {
            if(res.ok) {
                var attempts = [];
                res.json().then(data => {
                    data.forEach(item => {
                        attempts.push(item);
                    });
                    this.setState({
                        lastAttempts: attempts
                    });
                })
            }
        })
    }

    render() {
        return (
            <div className="display-column">
                <div>
                    <h3>Your new challenge is</h3>
                    <div className="challenge">
                        {this.state.a} x {this.state.b}
                    </div>
                </div>
                <form onSubmit={this.handleSubmitResult}>
                    <label>
                        Your alias:
                        <input type="text" maxLength="12"
                               name="user"
                               value={this.state.user}
                               onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Your guess:
                        <input type="number" min="0"
                               name="guess"
                               value={this.state.guess}
                               onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
                <h4>{this.state.message}</h4>
                {this.state.lastAttempts.length > 0 && 
                    <LastAttemptsComponent lastAttempts={this.state.lastAttempts}/>
                }
            </div>
        );
    };
}

export default ChallengeComponent