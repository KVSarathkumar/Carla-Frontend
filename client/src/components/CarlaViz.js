import React, { PureComponent } from "react";
import { Button } from 'reactstrap';
import { GeoJsonLayer } from "@deck.gl/layers";
import { COORDINATE_SYSTEM } from "@deck.gl/core";
import {
  LogViewer,
  StreamSettingsPanel,
  MeterWidget,
  XVIZPanel,
  XVIZLiveLoader,
  VIEW_MODE
} from "streetscape.gl";
import { Form} from "@streetscape.gl/monochrome";
import { APP_SETTINGS, XVIZ_STYLE, CAR, } from "../variables/constants";

const carlaLog = new XVIZLiveLoader({
  logGuid: "mock",
  bufferLength: 10,
  serverConfig: {
    defaultLogLength: 50,
    serverUrl: "ws://192.168.43.13:8081"
  },
  worker: true,
  maxConcurrency: 10
});
const tableComponentProps = {
  table: {
    height: 120
  }
};


class CarlaViz extends PureComponent {
  state = {
    log: carlaLog,
    metadataReceived: false,
    settings: {
      viewMode: "PERSPECTIVE",
      showTooltip: true
    }
  };

  componentDidMount() {
    const { log } = this.state;
    log
      .on("ready", () => {
        const metadata = log.getMetadata();
        log.socket.onclose = () => {
          this.setState({
            metadataReceived: false
          });
        };
        if (metadata.map) {
          const mapLayer = new GeoJsonLayer({
            coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
            coordinateOrigin: [0, 0, 0],
            id: "carla_map",
            data: metadata.map,
            stroked: true,
            filled: true,
            wireframe: true,
            extruded: true,
            getFillColor: [255, 255, 255, 255],
            getLineColor: [255, 255, 255, 255],
            getLineWidth: 0.1,
            getRadius: 0.00001,
            opacity: 10
          });
          this.setState({
            map: mapLayer,
            metadataReceived: true
          });
          console.log("get map");
        } else {
          this.setState({
            metadataReceived: true
          });
          console.log("receive metadata without map");
        }
      })
      .on("error", console.error)
      .connect();
  }

  _onSettingsChange = changedSettings => {
    this.setState({
      settings: { ...this.state.settings, ...changedSettings }
    });
  };

  _onStreamSettingChange = changedSettings => {
    const { log } = this.state;
    if (log && log.isOpen()) {
      log.socket.send(JSON.stringify(changedSettings));
    } else {
      console.log("socket is closed");
    }
  };

  render() {
    const { log, map, metadataReceived, settings } = this.state;
    let customLayers = [];
    if (map) {
      customLayers = [map];
    }

    return (
      <div id="container">
        <div id="control-panel">
          <div id="github">
              <div style={{textAlign:"center",paddingBottom:"50px"}}>
              <Button onClick={()=>this.props.toggle()} color="primary" >Stop Carla</Button>
              </div>
           
          </div>
          {metadataReceived ? (
            <div>
              <hr id="github-hr" />
              <XVIZPanel log={log} name="Metrics" />
              <hr />
              <XVIZPanel log={log} name="Camera" />
              <hr />
              <XVIZPanel
                log={log}
                name="Tables"
                componentProps={tableComponentProps}
              />
              <hr />
              <Form
                data={APP_SETTINGS}
                values={this.state.settings}
                onChange={this._onSettingsChange}
              />
              <StreamSettingsPanel
                log={log}
                onSettingsChange={this._onStreamSettingChange}
              />
            </div>
          ) : (
            <div style={{marginTop:"50px"}}>
              <h4>Launch the backend and refresh</h4>
            </div>
          )}
        </div>
        <div id="log-panel">
          <div id="map-view">
            <LogViewer
              log={log}
              showMap={false}
              car={CAR}
              xvizStyles={XVIZ_STYLE}
              showTooltip={settings.showTooltip}
              viewMode={VIEW_MODE[settings.viewMode]}
              customLayers={customLayers}
            />
            {metadataReceived ? (
              <div id="hud">
                <MeterWidget
                  log={log}
                  streamName="/vehicle/acceleration"
                  label="Acceleration"
                  min={-10}
                  max={10}
                />
                <hr />
                <MeterWidget
                  log={log}
                  streamName="/vehicle/velocity"
                  label="Speed"
                  getWarning={x => (x > 6 ? "FAST" : "")}
                  min={0}
                  max={20}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div id="author-info">
          <p>Author: Minjun Xu</p>
        </div>
      </div>
    );
  }
}

export default CarlaViz;

