// @flow
import React, { Component } from 'react';
import './Detail.css';
import cm315z from '../../resources/imgs/cm315z.jpg';
import type { Printer } from '../reducers/types';

type Props = {
  updatePrinterDetails: () => void,
  removePrinterDetails: () => void,
  walkPrinterDetails: () => void,
  printers?: Array<Printer>,
  match: {
    params: {
      address: string
    }
  }
};

export default class Detail extends Component<Props> {
  static defaultProps = {
    printers: []
  };

  render() {
    const {
      updatePrinterDetails,
      // removePrinterDetails,
      // walkPrinterDetails,
      printers,
      match
    } = this.props;

    const AlertItem = ({ prtAlertSeverityLevel, prtAlertDescription }) => (
      <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 className="my-0">{prtAlertSeverityLevel}</h6>
          <small className="text-muted">{prtAlertDescription}</small>
        </div>
      </li>
    );

    const AlertList = ({ alerts }) => (
      <div>
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">Status</span>
          <span className="badge badge-secondary badge-pill">
            {alerts.length}
          </span>
        </h4>

        <ul className="list-group mb-3">
          {alerts.map(alert => (
            <AlertItem key={alert.prtAlertIndex} {...alert} />
          ))}
        </ul>
      </div>
    );

    const MainDetails = () => {
      if (printers.length <= 0) {
        return <div />;
      }

      const result = printers.find(
        printer => printer.address === match.params.address
      );
      if (!result.details) {
        return <div />;
      }

      const { details } = result;
      if (!details) {
        return <div />;
      }

      return (
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            {details.prtAlertEntry ? (
              <AlertList alerts={details.prtAlertEntry} />
            ) : null}
            <div className="btn-group" role="group">
              <button
                className="btn btn-secondary"
                onClick={() => updatePrinterDetails(match.params.address)}
                type="button"
              >
                Refresh
              </button>
              {/* <button
                  className="btn btn-secondary"
                  onClick={() => removePrinterDetails(match.params.address)}
                  type="button"
                >
                  Clear
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => walkPrinterDetails(match.params.address)}
                  type="button"
                >
                  Walk
                </button> */}
            </div>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Details</h4>
            <dl>
              <dt>Product Name:</dt>
              <dd>{details.productName}</dd>
              <dt>Name:</dt>
              <dd>{details.name}</dd>
              <dt>Serial Number:</dt>
              <dd>{details.serialNumber}</dd>
              <dt>IP:</dt>
              <dd>{details.address}</dd>
              <dt>Location:</dt>
              <dd>{details.location ? details.location : 'N/A'}</dd>
              <dt>Cyan Toner Cartridge:</dt>
              <dd>
                {(details.cTonerCartridgeRemainCap /
                  details.cTonerCartridgeFullCap) *
                  100}
                %
              </dd>
              <dt>Magenta Toner Cartridge:</dt>
              <dd>
                {(details.mTonerCartridgeRemainCap /
                  details.mTonerCartridgeFullCap) *
                  100}
                %
              </dd>
              <dt>Yellow Toner Cartridge:</dt>
              <dd>
                {(details.yTonerCartridgeRemainCap /
                  details.yTonerCartridgeFullCap) *
                  100}
                %
              </dd>
              <dt>Black Toner Cartridge:</dt>
              <dd>
                {(details.bTonerCartridgeRemainCap /
                  details.bTonerCartridgeFullCap) *
                  100}
                %
              </dd>
              <dt>Cyan Drum Cartridge:</dt>
              <dd>
                {(details.cDrumCartridgeRemainCap /
                  details.cDrumCartridgeFullCap) *
                  100}
                %
              </dd>
              <dt>Magenta Drum Cartridge:</dt>
              <dd>
                {(details.mDrumCartridgeRemainCap /
                  details.mDrumCartridgeFullCap) *
                  100}
                %
              </dd>
              <dt>Yellow Drum Cartridge:</dt>
              <dd>
                {(details.yDrumCartridgeRemainCap /
                  details.yDrumCartridgeFullCap) *
                  100}
                %
              </dd>
              <dt>Black Drum Cartridge:</dt>
              <dd>
                {(details.bDrumCartridgeRemainCap /
                  details.bDrumCartridgeFullCap) *
                  100}
                %
              </dd>
              <dt>Waste Toner Box:</dt>
              <dd>
                {(details.wasteTonerBoxRemainCap /
                  details.wasteTonerBoxFullCap) *
                  100}
                %
              </dd>
              <dt>Right Side Cover:</dt>
              <dd>{details.rightSideCover}</dd>
              <dt>Rear Cover:</dt>
              <dd>{details.rearCover}</dd>
              <dt>DADF Cover:</dt>
              <dd>{details.dadfCover}</dd>
            </dl>
          </div>
        </div>
      );
    };

    return (
      <div>
        <div className="container">
          <div className="py-5 text-center">
            <img className="col-md-6" src={cm315z} alt="" />
            {/* <h2>Checkout form</h2>
            <p className="lead">
              Below is an example form built entirely with Bootstrap's form
              controls. Each required form group has a validation state that can
              be triggered by attempting to submit the form without completing
              it.
            </p> */}
          </div>

          <MainDetails />
          <footer className="my-5 pt-5 text-muted text-center text-small">
            <p className="mb-1">© 2017-2018 Company Name</p>
          </footer>
        </div>
      </div>
    );
  }
}
