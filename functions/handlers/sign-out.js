const moment = require('moment');

const signOut = async (req, res, db) => {
    const { timestamp, volunteerID } = req.body.params;
    console.log('I got the volunteerID: ', volunteerID);
    // get the volunteer from the db and set the end attribute
    try {
        const volunteerRef = db.collection('volunteers').doc(volunteerID);
        const volunteer = (await volunteerRef.get()).data();

        // find the volunteerHour object for the passed in timestamp
        const dayToFind = moment(timestamp).format('MM/DD/YYYY');
        volunteer.volunteerHours.some(volunteerHour => {
            if (volunteerHour.date === dayToFind) {
                // now find the hour object that doesn't have an end
                // attribute
                volunteerHour.hours.some(item => {
                    if (!item.end) {
                        item.end = moment().format();
                        return true;
                    }
                });
                return true;
            }
        });

        // update the volunteer with the new end time
        volunteerRef.set(volunteer, { merge: true });
        res.status(200).send('Volunteer has successfully signed out');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = signOut;
