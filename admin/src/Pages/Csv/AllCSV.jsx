import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllEventCSV = () => {
  const [csvFiles, setCsvFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await axios.get(
          "https://api.sofiasurgicals.com/api/get-all-csr"
        );
        setCsvFiles(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching CSV files");
        setIsLoading(false);
      }
    };

    fetchCSV();
  }, []);

  const deleteCSV = async (csvId) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This CSV file will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://api.sofiasurgicals.com/api/delete-csr/${csvId}`
        );

        if (response.status === 200) {
          setCsvFiles(csvFiles.filter((csv) => csv._id !== csvId));
          toast.success("CSV file deleted successfully");
        }
      } catch (error) {
        toast.error("Error deleting CSV file");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>All CSV Images</h4>
        </div>
        <div className="links">
          <Link to="/add-csr" className="add-new">
            Add New <i className="fa-solid fa-plus"></i>
          </Link>
        </div>
      </div>

      <section className="d-table">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Sr.No.</th>
              <th scope="col">CSV Image</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              csvFiles.map((csv, index) => (
                <tr key={csv._id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      src={`https://api.sofiasurgicals.com/${csv.image}`}
                      alt="CSV Preview"
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </td>

                  <td>
                    <Link className="bt edit" to={`/edit-csr/${csv._id}`}>
                      Edit <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="bt delete"
                      onClick={() => deleteCSV(csv._id)}
                    >
                      Delete <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default AllEventCSV;
