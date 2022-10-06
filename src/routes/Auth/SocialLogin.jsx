import GoogleLogin from 'react-google-login';

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;

export default function SocialLogin({ onClick }) {
  function handleClick({ target: { name } }) {
    onClick(name);
  }

  function onSuccess(response) {
    console.log(response);
  }

  function onFailure(response) {
    console.log(response);
  }

  return (
    <div>
      <GoogleLogin
        clientId={googleClientId}
        buttonText="Continue with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${githubClientId}`}
      >
        Continue with Github
      </a>
    </div>
  );
}
