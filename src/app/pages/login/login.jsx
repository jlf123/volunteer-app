import React, { useState, useEffect } from 'react';
import LagoInput from '../../components/input';
import { LagoButton } from '../../components/button';
import { withRouter } from 'react-router-dom';
import { queryForVolunteers } from '../../services/volunteers';
import debounce from 'lodash/debounce';
import filter from 'lodash/filter';
import './login.scss';
import { queryForEvents } from '../../services/events';

const updateSelectOptions = debounce(
    async (inputValue, setRegisteredUsers, registeredUsers) => {
        if (!inputValue || inputValue.length < 3) {
            return;
        }
        try {
            const volunteers = filter(await queryForVolunteers(inputValue), o =>
                regex.test(o.firstName + ' ' + o.lastName)
            );
            const registeredUsers = volunteers.map(volunteer => ({
                value: volunteer.id,
                label: volunteer.firstName + ' ' + volunteer.lastName
            }));
            setRegisteredUsers(registeredUsers);
        } catch (error) {
            console.log('error getting the list of volunteers', error);
        }
    },
    500
);

const updateEventSelectOptions = debounce(
    async (inputValue, setAvailableEvents) => {
        if (!inputValue) {
            return;
        }
        try {
            const events = await queryForEvents(inputValue);
            console.log('got the events', events);
            const availableEvents = events.map(event => ({
                value: event.id,
                label: event.eventName
            }));
            setAvailableEvents(availableEvents);
        } catch (error) {
            console.log('error getting the list of events', error);
        }
    },
    500
);

export const LoginPage = withRouter(({ history }) => {
    const [volunteers, setVolunteers] = useState([]);
    const [filteredVolunteers, setFilteredVolunteers] = useState([]);
    const [availableEvents, setAvailableEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [eventInputValue, setEventInputValue] = useState('');
    const [nextSlide, setNextSlide] = useState(false);
    useEffect(() => {
        const loadVolunteers = async () => {
            const volunteers = await queryForVolunteers();
            setVolunteers(volunteers);
        };
        const loadEvents = async () => {
            const events = await queryForEvents();
            setAvailableEvents(events);
        };
        loadVolunteers();
        loadEvents();
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
        setFilteredEvents(
            filter(availableEvents, o =>
                new RegExp(eventInputValue).test(o.eventName)
            ).map(event => ({
                value: event.id,
                label: event.eventName
            }))
        );
    }, [eventInputValue]);

    const containerClassNames = ['login-container'];

    if (nextSlide) {
        containerClassNames.push('login-container__next');
    }

    return (
        <div className={containerClassNames.join(' ')}>
            <div className="login">
                <div
                    className="login__toolbar"
                    data-testid="login-toolbar-to-events"
                >
                    <h1 className="login__title">Enter your name</h1>
                    <LagoButton
                        type="arrow"
                        arrowDirection="right"
                        onClick={() => setNextSlide(true)}
                    >
                        Select Event
                    </LagoButton>
                </div>
                <div className="login__input" data-testid="login-name">
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
            </div>
            <div className="line" />
            <div className="login">
                <div
                    className="login__toolbar"
                    data-testid="login-toolbar-to-confirmation"
                >
                    <h1 className="login__title">
                        What are you volunteering for?
                    </h1>
                    {/* only show the next icon here if an event has been selected */}
                    {eventInputValue && eventInputValue.value && (
                        <LagoButton
                            type="arrow"
                            arrowDirection="right"
                            data-testid="to-signin-icon"
                            onClick={() =>
                                history.push({
                                    pathname: '/confirmation/',
                                    state: {
                                        event: eventInputValue,
                                        user: inputValue
                                    }
                                })
                            }
                        >
                            Sign in
                        </LagoButton>
                    )}
                </div>
                <div className="login__input" data-testid="login-event">
                    <LagoInput
                        placeholder="Enter what you're here for..."
                        items={filteredEvents}
                        autoSelect
                        onChange={value => {
                            setEventInputValue(value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
});
