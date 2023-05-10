import React, { useEffect, useState } from "react";
import "./MainSection.css";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Card from "./components/Card";
import ModelPopup from "../ModelPopup/ModelPopup";
import { axiosGet } from "../../axiosServices";
import EditDetailsModal from "../ModelPopup/EditDetailsModal";

const MainSection = ({ setEmployeeId }) => {
  const [showModal, setShowModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [employees, setEmployees] = useState([])
  const [empById, setEmpById] = useState([])
  const [reRender, setReRender] = useState(false)

  const getAllEmployee = async () => {
    try {
      const res = await axiosGet('/employee')
      setEmployees(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }
  const getEmployeeById = async (id) => {
    try {
      const res = await axiosGet(`/employee/${id}`)
      setEmpById(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }
  const handleSearch = async (e) => {
    try {
      const res = await axiosGet(`/searchemployee/${e.target.value}`)
      setEmployees(res.data)
    }
    catch (err) {
      console.log(err.message)
    }
  }
  const handleEdit = async (id) => {
    getEmployeeById(id)
    setEditModal(true)
  }
  const handleReRender = () => {
    setReRender(true)
  }

  useEffect(() => {
    getAllEmployee()
  }, [showModal, editModal, reRender])
  return (
    <>
      {
        showModal && <ModelPopup setShowModal={setShowModal} />
      }
      {
        editModal && <EditDetailsModal setEditModal={setEditModal} empById={empById} />
      }

      <main className="mainContainer">
        <div className="mainWrapper">
          <h1>
            People <span className="emp-count">{employees.length}</span>
          </h1>
          <div className="employeeHeader">
            <div className="searchBox">
              <input
                type="text"
                placeholder="Search by name, email, designation etc"
                onChange={handleSearch}
              />
              <BiSearch size={20} />
            </div>
            <button className="add-btn"
              onClick={() => setShowModal(true)}
            ><IoMdAdd size="20" color="#fffff" />Add Employee</button>
          </div>
          <div className="employees">
            {
              employees && employees.map((emp) => {
                return <div key={emp._id} onClick={() => setEmployeeId(emp._id)}>
                  <Card
                    empData={emp}
                    handleEdit={handleEdit}
                    handleReRender={handleReRender} />
                </div>
              })
            }
          </div>
        </div>
      </main>
    </>
  );
};

export default MainSection;
