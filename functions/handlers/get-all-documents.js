const getAllDocuments = ({ type, db, select }) => async (req, res) => {
    let query = db.collection(type);
    if (select) {
        query = query.select(select);
    }
    const { docs, empty: isEmpty } = await query.get({ source: 'cache' });

    const data = docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    res.status(200).send(data);
};

module.exports = getAllDocuments;
