import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status}
                {isEmpty(profile.company) ? null : (
                  <span> at {profile.company}</span>
                )}
              </p>
              <p>{isEmpty(profile.location) ? null : profile.location}</p>
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    href={profile.website}
                    className="text-white p-2"
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}
                {profile.social && isEmpty(profile.social.twitter) ? null : (
                  <a target="_blank"
                    href={profile.social.twitter}
                    className="text-white p-2"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}
                {profile.social && isEmpty(profile.social.facebook) ? null : (
                  <a target="_blank"
                    href={profile.social.facebook}
                    className="text-white p-2"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}
                {profile.social && isEmpty(profile.social.linkedin) ? null : (
                  <a target="_blank"
                    href={profile.social.linkedin}
                    className="text-white p-2"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}
                {profile.social && isEmpty(profile.social.instagram) ? null : (
                  <a target="_blank"
                    href={profile.social.instagram}
                    className="text-white p-2"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
                {profile.social && isEmpty(profile.social.youtube) ? null : (
                  <a target="_blank"
                    href={profile.social.youtube}
                    className="text-white p-2"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
