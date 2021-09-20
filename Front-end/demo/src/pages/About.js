import React, {useState} from 'react'

const About = () => {
    
    // react hook its setState but smaller function
    const [image, setImage] = useState("");
    const [response, setResponse] = useState("");

    // JS event loops and Asnyc function
    // if the network the function is waiting for the reponse 
    async function UploadImage(imageData) { 
        const domainUrl = 'http://127.0.0.1:5000';
        const url = '/uploadCall'    
        // inject macilious code 

        // here fetch send web request
            // we send data into fetch and we wait for return
        let fetchGetResponse = await fetch(
            `${domainUrl}${url}`, { 

            // compose web request
            method:'POST', // this defind either its GET or POST 
            headers: {
                'Content-Type':"multipart/form-data"
            },
            // TO-DO come back fix this serucity issue
            // credentials:MyString,
            // referrerPolicy: 'no-referrer',
            // mode:'cors',
            body:JSON.stringify({
                "imageData":imageData
            })
        });

        try { 
            const data = await fetchGetResponse.json();
            console.log("Upload response call", data); // data to the code we write in python
            setResponse(data.message)


        } catch(error) { 

            console.error("Theres error with uploadCall")
        }

    }


    const fileSelectedHandler = event => { 
        console.log(event.target.files[0]);
        // muiltfile input is possible 
        const ImageDataFile = event.target.files[0]
        setImage(ImageDataFile)
        console.log(image)
    }

    const fileUploadHandler = () => { 
        console.log("test")

        if(image === '' || image === undefined || image === null) { 
            console.log("You did not upload a file")
        }else{
            console.log(image) // we know image is File
            const fd = new FormData();
            fd.append('test', image)
            // Fetch request call goes here
            UploadImage(fd)
        }
    }



    return (
        <div>
                <h1 className="title"> Upload Your Claim Medical</h1>
{/* add css react */}
    <p> How much is your claim?</p>

  {/* Form basically sends web request to a server
  Wheres the server ? IP:port */}
    <h2 > Drag & Drop Medical bills </h2>
    <input type="file" onChange={fileSelectedHandler}/>

    <div className="minibox"> 
        <p> The size of the claim </p>
        <input type="number"/> 

        <p> The bill its from hospital </p>
        <input type="text"/> 
        

        <button className="btn-main" onClick={fileUploadHandler}> Submit Claim</button>
    </div>
    <p> { response }</p>
    </div>
    )
}

export default About
