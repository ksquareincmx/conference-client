import React from "react";
import { profileService } from "services";

const ProfileContext = React.createContext({
  getProfile: () => {},
  getProfiles: () => {},
  modifyProfile: () => {}
});

class ProfileProvider extends React.Component {
  getProfile = id => {
    const { token: authToken } = this.props.auth.jwt;
    return profileService.getOne(id, authToken);
  };

  getProfiles = () => {
    const { token: authToken } = this.props.auth.jwt;
    return profileService.getAll(authToken);
  };

  modifyProfile = (profile, id) => {
    const { token: authToken } = this.props.auth.jwt;
    return this.profileService.modifyOne(profile, id, authToken);
  };

  render() {
    const { children } = this.props;
    return (
      <ProfileContext.Provider
        value={{
          getProfile: this.getProfile,
          getProfiles: this.getProfiles,
          modifyProfile: this.modifyProfile
        }}
      >
        {children}
      </ProfileContext.Provider>
    );
  }
}

const ProfileConsumer = ProfileContext.Consumer;
export { ProfileProvider, ProfileConsumer };
