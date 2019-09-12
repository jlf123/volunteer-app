import React from 'react';
import './landing.scss';
import { LarkspurIcon } from '../../components/icons';
import { LagoButton } from '../../components/button';
import { Link } from 'react-router-dom';

export const LandingPage = () => (
    <div className="landing">
        <div className="landing__content">
            <div className="landing__logo">
                <LarkspurIcon />
            </div>
            <div className="landing__buttons" data-testid="landing-button-group">
                <LagoButton>
                    <Link to="/signout/">Sign Out</Link>
                </LagoButton>
                <LagoButton>
                    <Link to="/login/">Volunteer Sign in</Link>
                </LagoButton>
            </div>
        </div>
    </div>
);
