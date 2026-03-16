import { Form, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const newsletterUrl = "https://www.course-api.com/cocktails-newsletter";

export const action = async ({ request }) => {
  const formData = await request.formData(); // oggetto FormData (coppie chiave/valore)
  const data = Object.fromEntries(formData); // converto in oggetto
  // const { name, lastName, email } = data; // desctructuring

  try {
    const response = await axios.post(newsletterUrl, data);
    toast.success(response.data.msg);
    return redirect("/"); // reindirizza alla home page dopo l'invio del form
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Newsletter = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Form className="form" method="POST">
      <h4 style={{ textAlign: "center", marginBottom: "2rem" }}>
        our newsletter
      </h4>
      {/* name */}
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required // campo obbligatorio per inviare il form
          className="form-input"
        />
      </div>
      {/* lastName */}
      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          lastName
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          className="form-input"
          required
        />
      </div>
      {/* email */}
      <div className="form-row">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="form-input"
          defaultValue="test@test.com"
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-block"
        style={{ marginTop: "2rem" }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting" : "Submit"}
      </button>
    </Form>
  );
};

export default Newsletter;
