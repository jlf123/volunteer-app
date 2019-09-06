const moment = require('moment');

const signIn = async (req, res, db) => {
    const {
        volunteerID,
        volunteerFirstName,
        volunteerLastName,
        eventID
    } = req.body;
    const today = moment().format('MM/DD/YYYY');

    if (!volunteerID && !(volunteerFirstName && volunteerLastName)) {
        res.status(400).send('send me the right parameters stupid');
    }

    // get the event and volunteer collections
    const eventCollection = db.collection('events');
    const volunteerCollection = db.collection('volunteers');

    try {
        // get the volunteer by the volunteerID and check if they've already
        // volunteered for the given event once today.
        // if this is a new volunteer then add it to the db
        const volunteerRef = volunteerID
            ? volunteerCollection.doc(volunteerID)
            : await volunteerCollection.add({
                  firstName: volunteerFirstName,
                  lastName: volunteerLastName,
                  volunteerHours: []
              });

        const volunteer = (await volunteerRef.get()).data();
        const alreadyVolunteeredToday = volunteer.volunteerHours.some(item => {
            if (item.eventID === eventID && item.date === today) {
                item.hours.push({
                    start: moment().format()
                });
                return true;
            }
        });

        // if the volunteer hasn't volunteered today yet, create a new volunteerHour object
        if (!alreadyVolunteeredToday) {
            volunteer.volunteerHours.push({
                eventID: eventID,
                date: today,
                hours: [
                    {
                        start: moment().format()
                    }
                ]
            });
        }

        // update the volunteer
        volunteerRef.set(volunteer, { merge: true });

        // check to see if the volunteer ref has already been added to the event
        // if not, then add it.
        const eventRef = eventCollection.doc(eventID);
        let event = (await eventRef.get()).data();
        if (!event.volunteers) event.volunteers = [];
        const eventHasVolunteer = event.volunteers.find(
            o => o.id === volunteerID
        );
        if (!eventHasVolunteer) {
            event.volunteers.push(volunteerRef);
            eventRef.set(event, { merge: true });
        }

        res.status(200).send(
            'Volunteer has successfully volunteered for event'
        );
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = signIn;
