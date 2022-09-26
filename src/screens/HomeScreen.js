import axios from "axios";
import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import "../styles/screens/home.css";

const TOKEN = "";
const HomeScreen = () => {
  const { todos, addTodoToLocalStorage } = useContext(TodoContext);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [formats, setFormats] = useState("");
  const [description, setDescription] = useState("");

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGFhZjVlZWU2YWFmOTc0YWFmNzgyNCIsImlhdCI6MTY1MDI3MDYyNywiZXhwIjoxNjU4MDQ2NjI3fQ.DPNAmayBSYX1FCVqb5pAI9N3FykZk4ovoUIraqKMb_c`;

      let data = new FormData();
      data.append("coverPhoto", file);
      data.append("title", "file uploading");
      data.append("description", description);
      data.append("cost", 300);
      data.append("resolutionWidth", 1020);
      data.append("resolutionHeight", 600);

      // data.append('formats', ['png', 'jpg', 'psd']);
      // dont do in this way  formats will save in this way in db "formats": ["png,xd,psd,jpg"]

      for (const format of formats.split(",")) {
        data.append("formats", format.trim());
      }
      for (const file of files) {
        data.append("gallery", file);
      }

      data.append("orientation", "portrait");
      data.append("subject", "uploading");

      console.log("enter", data, file, files);
      // axios
      //   .post('https://httpbin.org/anything', data)
      //   .then((res) => {
      //     console.log({ res });
      //   })
      //   .catch((error) => {
      //     console.log({ error });
      //   });
      const res = await axios({
        url: `http://localhost:8080/uploads`,
        method: "POST",
        data: data,
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log({ res });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    // <div className='ali container mx-auto px-4 sm:px-8 md:px-12  border-y-[1px] border-indigo-600 border-dashed hover:bg-neutral-300 hover:text-red-400'>
    //   <div className='grid grid-cols-12 gap-6 pt-16'>
    //     <div className='col-span-12 md:col-span-6 lg:col-span-4'>hello</div>
    //     <div className='col-span-12 md:col-span-6 lg:col-span-4'>hello</div>
    //     <div className='col-span-12 md:col-span-6 lg:col-span-4'>hello</div>
    //     <div className='col-span-12 md:col-span-6 lg:col-span-4'>hello</div>
    //     <div className='col-span-12 md:col-span-6 lg:col-span-4'>hello</div>
    //     <div className='col-span-12 md:col-span-6 lg:col-span-4'>hello</div>
    //     <div className='col-span-12 md:col-span-6 lg:col-span-4'>hello</div>
    //     <div className='col-span-12 md:col-span-6 lg:col-span-4'>hello</div>
    //     <div className='col-span-12 md:col-span-6 lg:col-span-4'>hello</div>
    //     <div className='col-span-12 md:col-span-6 lg:col-span-4'>hello</div>
    //     <div className='col-span-12 md:col-span-6 lg:col-span-4'>hello</div>
    //     <div className='col-span-12 md:col-span-6 lg:col-span-4'>hello</div>
    //     <div className='col-span-12 md:col-span-6 lg:col-span-4 text-yellow-400'>
    //       hello
    //     </div>
    //   </div>
    //   <div className='row'>
    //     <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>Div</div>
    //     <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>Div</div>
    //     <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>Div</div>
    //     <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>Div</div>
    //     <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>Div</div>
    //     <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>Div</div>
    //     <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>Div</div>
    //     <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>Div</div>
    //     <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>Div</div>
    //     <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>Div</div>
    //     <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>Div</div>
    //     <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>Div</div>
    //   </div>
    // </div>
    <>
      <form onSubmit={formHandler} className="createArtScreen_form">
        <input
          type="file"
          name="coverPhoto"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="file"
          name="gallery"
          multiple
          required
          onChange={(e) => setFiles(e.target.files)}
        />
        {/* <input
          type='text'
          placeholder='Enter comma separated formats'
          onChange={(e) => setFormats(e.target.value)}
          className='border border-emerald-500'
        /> */}
        <button type="submit">Submit</button>
      </form>
      <ol className="ml-5">
        {todos?.length > 0 &&
          todos?.map((t, i) => (
            <li key={i}>
              {i + 1}- {t}
            </li>
          ))}
      </ol>
      <input
        type="text"
        placeholder="Enter todos"
        onChange={(e) => setFormats(e.target.value)}
        className="border border-emerald-500"
        required
      />
      <button
        onClick={() => {
          addTodoToLocalStorage(formats.trim());
        }}
      >
        Add
      </button>
    </>
  );
};

export default HomeScreen;

// const store = useSelector((store) => store);
// const dispatch = useDispatch();
// console.log(store);

// useEffect(() => {
//   dispatch(cakeActions.ordered());
//   dispatch(cakeActions.ordered());
//   dispatch(cakeActions.ordered());
//   dispatch(cakeActions.ordered());
//   dispatch(cakeActions.ordered());
//   dispatch(cakeActions.restocked(20));

//   dispatch(iceCreamActions.ordered());
//   dispatch(iceCreamActions.ordered());
//   dispatch(iceCreamActions.ordered());
//   dispatch(iceCreamActions.ordered());
//   dispatch(iceCreamActions.restocked(10));
// }, []);

// const getData = async () => {
//   const res = await axios({
//     url: `http://localhost:8080/`,
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   console.log({ res });
// };
