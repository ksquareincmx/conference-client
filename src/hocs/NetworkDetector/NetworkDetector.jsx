import React, { Component } from "react";
// import CloudOffIcon from "@material-ui/icons/CloudOff";
import Icon from "@material-ui/core/Icon";
import { CloudOff, CloudDone } from "@material-ui/icons/";

// const appServiceURI = `${process.env.REACT_APP_SERVER_URI}Profiles/`;
const appServiceURI = `http://google.com`;

export const withNetworkDetector = ComposedComponent => {
  return class NetworkDetector extends Component {
    state = {
      isDisconnected: false
    };

    componentDidMount() {
      this.handleConnectionChange();
      window.addEventListener("online", this.handleConnectionChange);
      window.addEventListener("offline", this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener("online", this.handleConnectionChange);
      window.removeEventListener("offline", this.handleConnectionChange);
    }

    handleConnectionChange = () => {
      //   debugger;
      const condition = navigator.onLine ? "online" : "offline";
      if (condition === "online") {
        const webPing = setInterval(() => {
          fetch(`${appServiceURI}`, {
            mode: "no-cors"
          })
            .then(() => {
              this.setState({ isDisconnected: false }, () => {
                return clearInterval(webPing);
              });
            })
            .catch(() => this.setState({ isDisconnected: true }));
        }, 2000);
        return;
      }

      return this.setState({ isDisconnected: true });
    };

    render() {
      const { isDisconnected } = this.state;
      return (
        <React.Fragment>
          <div
            className={
              "connection-status " +
              (isDisconnected ? "offline" : "online autohide_after_5s")
            }
          >
            <span>
              <Icon>{isDisconnected ? <CloudOff /> : <CloudDone />}</Icon>
              <span>Server is {isDisconnected ? "offline" : "online"}</span>
            </span>
          </div>

          <ComposedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};
