import React, { useEffect, useState } from 'react';
import LagoInput from '../../components/input';
import debounce from 'lodash/debounce';
import {
    queryForVolunteers,
    signVolunteerOut
} from '../../services/volunteers';
import { withRouter } from 'react-router-dom';
import { LagoButton } from '../../components/button';
import filter from 'lodash/filter';
import './sign-out.scss';

export const SignOutPage = withRouter(({ history }) => {
    const [inputValue, setInputValue] = useState('');
    const [volunteers, setVolunteers] = useState([]);
    const [filteredVolunteers, setFilteredVolunteers] = useState([]);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [successfullySignedOut, setSuccessfullySignedOut] = useState(false);
    useEffect(() => {
        const loadVolunteers = async () => {
            const volunteers = await queryForVolunteers();
            setVolunteers(volunteers);
        };
        loadVolunteers();
    }, []);
    useEffect(() => {
        if (inputValue.length < 3) return;
        setFilteredVolunteers(
            filter(volunteers, o =>
                new RegExp(inputValue).test(o.firstName + ' ' + o.lastName)
            ).map(volunteer => ({
                value: volunteer.id,
                label: volunteer.firstName + ' ' + volunteer.lastName
            }))
        );
    }, [inputValue]);
    useEffect(() => {
        if (successfullySignedOut) {
            setTimeout(() => history.push('/'), 3000);
        }
    }, [successfullySignedOut]);
    return (
        <div className="signout">
            {isSigningOut && (
                <React.Fragment>
                    <div className="signout__spinner-label">
                        One moment while we sign you out...
                    </div>
                    <div className="spinner-icon"></div>
                </React.Fragment>
            )}{' '}
            {!isSigningOut && !successfullySignedOut && (
                <React.Fragment>
                    <div className="login__toolbar">
                        <h1 className="login__title">
                            Enter your name to sign out
                        </h1>
                        {/* only let the volunteer log out if they're actually in the db. */}
                        {inputValue && inputValue.value && (
                            <LagoButton
                                type="arrow"
                                arrowDirection="right"
                                onClick={async () => {
                                    setIsSigningOut(true);
                                    await signVolunteerOut(inputValue.value);
                                    setTimeout(() => {
                                        setIsSigningOut(false);
                                        setSuccessfullySignedOut(true);
                                    }, 3000);
                                }}
                            >
                                Sign out
                            </LagoButton>
                        )}
                    </div>
                    <div className="login__input">
                        <LagoInput
                            placeholder="Enter your name..."
                            items={filteredVolunteers}
                            autoSelect
                            onChange={value => {
                                console.log('got the onchage', value);
                                setInputValue(value);
                            }}
                        />
                    </div>
                </React.Fragment>
            )}
            {successfullySignedOut && (
                <h1 className="signout__spinner-label">
                    Ok! You're all set. Thank you!
                </h1>
            )}
        </div>
    );
});
