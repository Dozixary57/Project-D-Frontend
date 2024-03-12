import authService from "../../../backend/services/authService";

const BetaLabel = () => {
    return (
        <p onClick={() => authService.Logout()} style={{ cursor: "pointer", backgroundColor: "rgba(0, 0, 0, 0.4)", position: "fixed", padding: "0.2em", letterSpacing: "0.25em", zIndex: 100, boxShadow: "0 0 0.1em 0.2em rgba(0, 0, 0, 0.4)", bottom: "0em", right: "1em" }}>
            Pre-Alpha 1.3
        </p>
    )
}

export { BetaLabel };