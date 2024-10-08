import RythmixIcon from '../assets/imgs/RythmixIcon.png'
import { useState } from "react"
import { useNavigate } from "react-router"
import { UserService } from "../services/user.service.js"
import { signup } from "../store/actions/user.action.js"

export function SignupForm() {
    const [credentials, setCredentials] = useState(UserService.getEmptyCredentials())
    const [isUsernameTaken, setIsUsernameTaken] = useState(false)
    const navigate = useNavigate()

    async function onSignup(credentials) {
        try {
            await signup(credentials)
            navigate('/')
        } catch (err) {
            setIsUsernameTaken((prevState) => true)
            console.log('Oops try again')
        }
    }

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSignup(credentials)
    }

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-container">
                <img src={RythmixIcon} alt="My Image" />
                <h1 className="signup-title">Sign Up to Rythmix</h1>
                <label className="input-label">Enter your full name
                    <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Fullname"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                </label>
                <label className="input-label">Enter your username
                    <input
                        className={`${isUsernameTaken ? 'username-taken' : ""}`}
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                </label>
                {isUsernameTaken &&
                    <div className="username-taken-msg">Username Unavailable</div>
                }
                <label className="input-label">Password
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </label>
                <button className="signup-btn">{'Sign Up'}</button>
            </div>
        </form>
    )
}
