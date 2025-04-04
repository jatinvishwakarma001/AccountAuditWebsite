function showForm() {
    document.getElementById("purchaseForm").style.display = "block";
}

document.getElementById("purchaseForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("companyName", document.getElementById("companyName").value);
    formData.append("projectName", document.getElementById("projectName").value);
    formData.append("gstNumber", document.getElementById("gstNumber").value);
    formData.append("serviceType", document.getElementById("serviceType").value);
    formData.append("fileUpload", document.getElementById("fileUpload").files[0]);

    try {
        let response = await fetch("http://localhost:5000/submit-form", {
            method: "POST",
            body: formData
        });

        let result = await response.json();
        alert(result.message);
    } catch (error) {
        alert("Error submitting form");
    }
});
