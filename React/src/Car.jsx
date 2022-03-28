import { useState, useEffect } from 'react';
import axios from 'axios';
const Car = () => {
    const [car, setCar] = useState([]);
    const [edit, setEdit] = useState(false);
    const [updateCar, setUpdateCar] = useState({});
    const getCars = () => {
        axios
            .get('/car')
            .then((res) => {
                setCar(res.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getCars();
    }, []);
    const createCar = (event) => {
        event.preventDefault();
        const carObject = {
            id: event.target.id.value,
            carname: event.target.carname.value,
            price: event.target.price.value,
            color: event.target.color.value,
            in_stock: event.target.in_stock.value,
        };
        axios
            .post('/car', carObject)
            .then((res) => {
                getCars();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteCar = (id) => {
        axios
            .delete('/car/' + id)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getCars();
    };
    const deleteAll = () => {
        axios
            .get('/car/deleteall')
            .then((res) => {
                getCars();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const editCar = (id) => {
        setEdit(true);
        setUpdateCar(id);
    };
    const saveCar = (event) => {
        event.preventDefault();
        const carObject = {
            carname: event.target.carname.value,
            price: event.target.price.value,
            color: event.target.color.value,
            in_stock: event.target.in_stock.value,
        };
        axios.put(`/car/${updateCar}`, carObject).then((res) => {
            getCars();
            setEdit(false);
            console.log(res.data);
        });
    };
    return (
        <div className="container-fluid text-center">
            {edit ? (
                <div>
                    <h1 className="mt-3">Update Car</h1>
                    <form className="form-group" onSubmit={saveCar}>
                        <b className="subHeading">Car Name : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="text"
                            name="carname"
                            placeholder="Enter Car Name"
                        />
                        <br />
                        <b className="subHeading">Price : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="number"
                            name="price"
                            placeholder="Enter Car Price"
                        />
                        <br />
                        <b className="subHeading">Car Color : </b>
                        <select
                            name="color"
                            className="form-select d-inline-flex w-50"
                        >
                            <option selected>Select</option>
                            <option value="Black">Black</option>
                            <option value="Blue">Blue</option>
                            <option value="Grey">Grey</option>
                        </select>
                        <br />
                        <b className="subHeading">In Stock : </b>
                        <input type="radio" name="in_stock" value="1" />
                        Available
                        <br />
                        <input type="radio" name="in_stock" value="0" />
                        Unavailable
                        <br />
                        <button className="btn btn-outline-primary">
                            <b>Update Car</b>
                        </button>
                        <br />
                    </form>
                </div>
            ) : (
                <div>
                    <h1 className="mt-3">Car Details</h1>
                    <form className="form-group" onSubmit={createCar}>
                        <b className="subHeading">Car Id : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="number"
                            name="id"
                            placeholder="Enter Car Id"
                        />
                        <br />
                        <b className="subHeading">Car Name : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="text"
                            name="carname"
                            placeholder="Enter Car Name"
                        />
                        <br />
                        <b className="subHeading">Price : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="number"
                            name="price"
                            placeholder="Enter Car Price"
                        />
                        <br />
                        <b className="subHeading">Car Color : </b>
                        <select
                            name="color"
                            className="form-select d-inline-flex w-50"
                        >
                            <option selected>Select</option>
                            <option value="Black">Black</option>
                            <option value="Blue">Blue</option>
                            <option value="Grey">Grey</option>
                        </select>
                        <br />
                        <b className="subHeading">In Stock : </b>
                        <input type="radio" name="in_stock" value="1" />
                        Available
                        <br />
                        <input type="radio" name="in_stock" value="0" />
                        Unavailable
                        <br />
                        <button className="btn btn-outline-primary">
                            <b>Add Car</b>
                        </button>
                        <br />
                    </form>
                    <button
                        className="btn btn-outline-danger"
                        onClick={deleteAll}
                    >
                        <b>Delete All</b>
                    </button>
                    <br />
                    <div className="table table-bordered table-striped text-center">
                        <table className="text-center ">
                            <tr>
                                <th>Id</th>
                                <th>Car Name</th>
                                <th>Price</th>
                                <th>Color</th>
                                <th>In Stock</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                            {car.map((val, index) => {
                                return (
                                    <tr>
                                        <td>{val.id}</td>
                                        <td>{val.carname}</td>
                                        <td>{val.price}</td>
                                        <td>{val.color}</td>
                                        <td>{val.in_stock}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => {
                                                    deleteCar(val.id);
                                                }}
                                            >
                                                <b> Delete</b>
                                            </button>
                                            <br />
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={() => {
                                                    editCar(val.id);
                                                }}
                                            >
                                                <b> Edit</b>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Car;
