const filter = require('lodash/filter');

const search = async (req, res, db) => {
    const { type, query } = req.query;

    if (!type) {
        res.status(400).send('A type is required to search');
        return;
    }

    if (!query) {
        res.status(400).send(
            'How am I supposed to search without a query... duh'
        );
        return;
    }

    if (!/volunteers|events/.test(type)) {
        res.status(400).send(
            'Invalid type, type must either be volunteers or events'
        );
        return;
    }

    try {
        const collectionRef = db.collection(type);
        const { docs, empty: isEmpty } = await collectionRef.get();
        const regex = new RegExp(decodeURIComponent(query), 'i');

        if (isEmpty) {
            res.send([]);
            return;
        }

        const data = docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        if (type === 'volunteers') {
            const filteredData = filter(data, o =>
                regex.test(o.firstName + ' ' + o.lastName)
            );

            res.send(filteredData);
            return;
        }

        if (type === 'events') {
            const filteredData = filter(data, o => regex.test(o.eventName));
            res.send(filteredData);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

module.exports = search;
