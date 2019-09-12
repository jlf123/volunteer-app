import React, { useEffect } from 'react';
import Moment from 'moment';
import { withRouter } from 'react-router-dom';
import { volunteerForEvent } from '../../services/events';
import './confirmation.scss';

export const ConfirmationPage = withRouter(
    ({
        history,
        location: {
            state: { event, user }
        }
    }) => {
        useEffect(() => {
            volunteerForEvent(event, user);
            setTimeout(() => history.push('/'), 5000);
        }, []);
        return (
            <div className="confirmation">
                <h2>Thanks for volunteering, you're all set</h2>
                <div className="confirmation__note">
                    Don't forget to sign out
                </div>
                <div className="confirmation__icon">
                    <i className="fas fa-check-circle" />
                </div>
                <h1 data-testid="confirmation-name">{user.label ? user.label : user}</h1>
                <div data-testid="confirmation-event-and-time">
                    {event.label} <br /> at <br /> {Moment().format('hh:mm a')}
                </div>
            </div>
        );
    }
);
