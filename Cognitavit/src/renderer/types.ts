interface AuthDetails  {
    username: string;
    password: string;
};

interface AuthenticationToken  {
    kind: string;
    localId: string;
    email: string;
    displayName: string;
    idToken: string;
    registered: boolean;
    refreshToken: string;
    expiresIn: string;
};

//Implement after user profile service implemented
interface UserProfileDetails  {
    name: string;
};

export {AuthDetails, AuthenticationToken, UserProfileDetails};