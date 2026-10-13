
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [students, setStudents] = useState([]);

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");

    const [editId, setEditId] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const API_URL = "http://127.0.0.1:8000/api/students/";

    // GET ALL STUDENTS
    const getStudents = async () => {
        try {
            const response = await axios.get(API_URL);
            setStudents(response.data);
        } catch (error) {
            console.log(
                "Get Students Error:",
                error.response?.data || error.message
            );
        }
    };

    useEffect(() => {
        getStudents();
    }, []);

    // ADD STUDENT
    const addStudent = async (e) => {
        e.preventDefault();

        const studentData = {
            name: name,
            age: Number(age),
            email: email
        };

        try {
            await axios.post(API_URL, studentData);

            alert("Student added successfully!");

            clearForm();
            await getStudents();

        } catch (error) {
            console.log(
                "Add Error:",
                error.response?.data || error.message
            );
        }
    };

    // GET SINGLE STUDENT
    const getSingleStudent = async (id) => {
        try {
            const response = await axios.get(`${API_URL}${id}/`);
            setSelectedStudent(response.data);
        } catch (error) {
            console.log(
                "Get Single Student Error:",
                error.response?.data || error.message
            );
        }
    };

    // EDIT STUDENT
    const editStudent = (student) => {
        setEditId(student.id);
        setName(student.name);
        setAge(String(student.age));
        setEmail(student.email);
        setSelectedStudent(null);
    };

    // UPDATE STUDENT
    const updateStudent = async (e) => {
        e.preventDefault();

        const studentData = {
            name: name,
            age: Number(age),
            email: email
        };

        try {
            await axios.put(`${API_URL}${editId}/`, studentData);

            alert("Student updated successfully!");

            clearForm();
            await getStudents();

        } catch (error) {
            console.log(
                "Update Error:",
                error.response?.data || error.message
            );
        }
    };

    // DELETE STUDENT
    const deleteStudent = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(`${API_URL}${id}/`);

            alert("Student deleted successfully!");

            if (editId === id) {
                clearForm();
            }

            if (selectedStudent?.id === id) {
                setSelectedStudent(null);
            }

            await getStudents();

        } catch (error) {
            console.log(
                "Delete Error:",
                error.response?.data || error.message
            );
        }
    };

    // CLEAR FORM
    const clearForm = () => {
        setName("");
        setAge("");
        setEmail("");
        setEditId(null);
    };

    return (
        <div className="container">

            <h1>Student Management</h1>

            {/* ADD / UPDATE FORM */}
            <div className="form-container">

                <h2>
                    {editId !== null
                        ? "Update Student"
                        : "Add Student"}
                </h2>

                <form
                    onSubmit={
                        editId !== null
                            ? updateStudent
                            : addStudent
                    }
                >

                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="number"
                        placeholder="Enter Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        min="0"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button type="submit">
                        {editId !== null
                            ? "Update Student"
                            : "Add Student"}
                    </button>

                    {editId !== null && (
                        <button
                            type="button"
                            onClick={clearForm}
                        >
                            Cancel
                        </button>
                    )}

                </form>
            </div>

            {/* DISPLAY ALL STUDENTS */}
            <div className="student-container">

                <h2>Student List</h2>

                {students.length === 0 ? (
                    <p>No students found</p>
                ) : (
                    students.map((student) => (
                        <div
                            className="student-card"
                            key={student.id}
                        >

                            <h3>{student.name}</h3>

                            <p>
                                <strong>Age:</strong> {student.age}
                            </p>

                            <p>
                                <strong>Email:</strong> {student.email}
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    getSingleStudent(student.id)
                                }
                            >
                                View
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    editStudent(student)
                                }
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    deleteStudent(student.id)
                                }
                            >
                                Delete
                            </button>

                        </div>
                    ))
                )}

            </div>

            {/* DISPLAY SINGLE STUDENT */}
            {selectedStudent !== null && (
                <div className="student-container">

                    <h2>Single Student Details</h2>

                    <p>
                        <strong>ID:</strong> {selectedStudent.id}
                    </p>

                    <p>
                        <strong>Name:</strong> {selectedStudent.name}
                    </p>

                    <p>
                        <strong>Age:</strong> {selectedStudent.age}
                    </p>

                    <p>
                        <strong>Email:</strong> {selectedStudent.email}
                    </p>

                    <button
                        type="button"
                        onClick={() => setSelectedStudent(null)}
                    >
                        Close
                    </button>

                </div>
            )}

        </div>
    );
}

export default App;
