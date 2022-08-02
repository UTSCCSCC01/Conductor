import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { sessionStorage_get } from '../../../utils/store/store';
// Components
import SmallHeader from '../../Header/SmallHeader';
// Style
import '../BotBuilderPage.css';
import { Button, Input, Modal } from 'antd';
import { DiHaskell } from 'react-icons/di';
import { MdAddCircleOutline } from 'react-icons/md';

function Predicates({ addedPredecates, onSave }) {
    const [DisplayModal, setDisplayModal] = useState(false);
    const [Predicates, setPredicates] = useState([]);
    const [PredicateName, setPredicateName] = useState("");
    const [Description, setDescription] = useState("");
    const [DisplayPredicateModal, setDisplayPredicateModal] = useState(false);
    const [SelectedPredicate, setSelectedPredicate] = useState(null);

    useEffect(() => {
        setPredicates(addedPredecates);
        // axios to get predicates added by the user
        // axios.post(`http://www.localhost:8080/api/predicates/get_predicate_by_userid`, { userId: JSON.stringify(sessionStorage_get("auth").localId) })
        //     .then(response => {
        //         if (response.data.success) {
        //             setPredicates(response.data.predicateData);
        //             alert("Successfully Added!");
        //         } else {
        //             console.log("Failed to add predicate");
        //         }
        //     });
    }, [Predicates]);

    const onAddPredicate = () => {
        setDisplayModal(true);
        if (!sessionStorage_get("auth")) {
            return;
        }
        const variables = {
            name: PredicateName,
            descriptor: Description,
            userId: JSON.stringify(sessionStorage_get("auth").localId)
        };
        // axios.post(`http://www.localhost:8080/api/predicate/create_predicate`, variables)
        //     .then(response => {
        //         if (response.data.success) {
        //             alert("Successfully Added!");
        //         } else {
        //             console.log("Failed to add predicate");
        //         }
        //     });
    };

    const onPredicateName = (event) => {
        if (event.target) setPredicateName(event.target.value);
        else setPredicateName("");
    };

    const onDescription = (event) => {
        if (event.target) setDescription(event.target.value);
        else setDescription("");
    };

    const onCancelModal = () => {
        setPredicateName("");
        setDescription("");
        setDisplayModal(false);
    };

    const addPredicate = () => {
        let predicates = Predicates;
        predicates.push({
            _id: '1',
            name: PredicateName,
            description: Description,
        });
        setPredicates(predicates);
        setDisplayModal(false);
        onSave(predicates);
        // const variables = {
        //     userId: _________,
        //     name: PredicateName,
        //     description: Description,
        // }
        // axios.post(`http://www.localhost:8080/api/predicates/add_predicate`, variables)
        //     .then(response => {
        //         if (response.data.success) {
        //             alert("Successfully Added!");
        //             predicates = Predicates.push({
        //                 predicateId: response.data.predicateData.name._id,
        //                 name: response.data.predicateData.name,
        //                 description: response.data.predicateData.description,
        //             });
        //             setPredicates(predicates);
        //             setDisplayModal(false);
        //             onSave(predicates);
        //         } else {
        //             console.log("Failed to add predicate");
        //         }
        //     });
    };

    const onPredicate = (index) => {
        setDisplayPredicateModal(true);
        setSelectedPredicate(index);
    };

    const onCancel = () => {
        setDisplayPredicateModal(false);
        onPredicateName("");
        onDescription("");
        setSelectedPredicate(null);
    };

    const deletePredicate = () => {
        // Remove
        let predicates = Predicates;
        predicates.splice(SelectedPredicate, 1);
        setPredicates(predicates);
        onSave(predicates);
        // Reset
        setDisplayPredicateModal(false);
        setSelectedPredicate(null);
        setPredicateName("");
        setDescription("");
        // axios.delete(`http://www.localhost:8080/api/predicates/delete_predicate`, { predicateId: Predicates[SelectedPredicate]._id })
        //     .then(response => {
        //         if (response.data.success) {
        //             alert("Successfully Added!");
        //             // Remove
        //             let predicates = Predicates;
        //             predicates.splice(SelectedPredicate, 1);
        //             setPredicates(predicates);
        //             onSave(predicates);
        //             // Reset
        //             setDisplayPredicateModal(false);
        //             setSelectedPredicate(null);
        //             setPredicateName("");
        //             setDescription("");
        //         } else {
        //             console.log("Failed to add predicate");
        //         }
        //     });
    };

    const updatePredicate = () => {
        setDisplayPredicateModal(false);
        setPredicateName("");
        setDescription("");
    };

    const predicates = Predicates ? Predicates.map((row, index) => {
        return (
            <div key={index} className="applet predicates">
                <Modal                     
                    title="Predicate" 
                    visible={DisplayPredicateModal} 
                    destroyOnClose={true}
                    onOk={updatePredicate} 
                    onCancel={onCancel}
                    footer={[
                        <Button key="delete" type="primary" danger onClick={deletePredicate}>
                            Delete
                        </Button>,
                        <div key={`modal-${index}`}>
                            <Button key="back" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button key="submit" type="primary" onClick={updatePredicate}>
                                Submit
                            </Button>
                        </div>
                    ]}
                    className="predicate-update-modal"
                >
                    <p>Predicate Name</p>
                    <Input 
                        placeholder="Predicate Name"
                        defaultValue={Predicates && Predicates[SelectedPredicate] && Predicates[SelectedPredicate].name}
                        onChange={onPredicateName}
                        className="predicate-input"
                    />
                    <p>Predicate Description</p>
                    <Input 
                        placeholder="Description"
                        defaultValue={Predicates && Predicates[SelectedPredicate] && Predicates[SelectedPredicate].description}
                        onChange={onDescription}
                        className="predicate-input"
                    />
                    <p>Predicate ID</p>
                    <Input 
                        placeholder="Predicate ID"
                        onChange={onDescription}
                        className="predicate-input"
                        disabled
                    />
                </Modal>
                <DiHaskell />
                <div onClick={() => onPredicate(index)}>
                    <h3>{row.name}</h3>
                    <p>{row.description}</p>
                </div>
            </div>
        );
    }) : undefined;

    return (
        <div className="bot-event-blocks">
            <Modal 
                title="Add a new predicate" 
                visible={DisplayModal} 
                destroyOnClose={true}
                onOk={addPredicate} 
                onCancel={onCancelModal}
                footer={[
                    <Button key="back" onClick={onCancelModal}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={addPredicate}>
                        Submit
                    </Button>
                ]}
                className="predicate-modal"
            >
                <p>Predicate Name</p>
                <Input 
                    placeholder="Predicate Name"
                    onChange={onPredicateName}
                    className="predicate-input"
                />
                <p>Predicate Description</p>
                <Input 
                    placeholder="Description"
                    onChange={onDescription}
                    className="predicate-input"
                />
            </Modal>
            <SmallHeader title="Predicates" />
            <div className="applet-list">
                <div className="added-applet">{predicates}</div>
                <div className="applet save" onClick={onAddPredicate}>
                    <MdAddCircleOutline />
                    <div><h3>Add a new predicate</h3></div>
                </div>
            </div>
        </div>
    );
}

export default Predicates;