import React from "react";
import ProfileService from "services/ProfileService";
import baseUri from "../../config/baseUri";

const ProfileContext = React.createContext({
  getProfile: () => {},
  getProfiles: () => {},
  modifyProfile: () => {}
});

export const ProfileConsumer = ProfileContext.Consumer;
export class ProfileProvider extends React.Component {
  profileService = ProfileService(
    baseUri + "Profile/",
    this.props.auth.jwt.token
  );
  getProfile = id => {
    return this.profileService.getOne(id);
  };

  getProfiles = () => {
    return this.profileService.getAll();
  };

  modifyProfile = (profile, id) => {
    return this.profileService.modifyOne(profile, id);
  };

  render() {
    return (
      <ProfileContext.Provider
        value={{
          getProfile: this.getProfile,
          getProfiles: this.getProfiles,
          modifyProfile: this.modifyProfile
        }}
      >
        {this.props.children}
      </ProfileContext.Provider>
    );
  }
}
