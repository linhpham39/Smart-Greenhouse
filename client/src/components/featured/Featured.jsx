import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "react-circular-progressbar/dist/styles.css";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { SanitizerOutlined } from "@mui/icons-material";
import FireHydrantAltIcon from '@mui/icons-material/FireHydrantAlt';
import { Button } from "@mui/material";
import Chart from "../chart/Chart";
import axios from "axios";

const Featured = ({ type, status }) => {
  //type ="Light"
  console.log("type", type);
  console.log("status", status);
  console.log("status11", status.light);
  var emojiArray = {
    "light": [<EmojiObjectsIcon className="iconFeature"
      style={{ color: "rgb(240,230,140)", fontSize: "130px" }}
    />,
    <EmojiObjectsIcon className="iconFeature"
      style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "130px" }}
    />],
    "ec_pump": [<FireHydrantAltIcon className="iconFeature"
      style={{ color: "rgba(0, 128, 0, 0.4)", fontSize: "130px" }}
    />,
    <FireHydrantAltIcon className="iconFeature"
      style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "130px" }}
    />],
    "ph_pump": [<SanitizerOutlined className="iconFeature"
      style={{ color: "rgba(255, 0, 0, 0.4)", fontSize: "130px" }}
    />,
    <SanitizerOutlined className="iconFeature"
      style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "130px" }}
    />],
    "oxi_pump": [<SanitizerOutlined className="iconFeature"
      style={{ color: "rgb(25, 118, 210)", fontSize: "130px" }}
    />,
    <SanitizerOutlined className="iconFeature"
      style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "130px" }}
    />],
  }

  var index = Object.keys(emojiArray).indexOf(type);

  
  
  function handleClickOn() {
    //change the color of the emoji
    //change the status
    status[type] = "On";
    var buttons = document.getElementsByClassName("featuredBottom");
    buttons[index].classList.remove('off');
    buttons[index].classList.add('on');
    var img = document.getElementsByClassName("iconFeature")[index];
    img.style.color = emojiArray[type][0].props.style.color;
    console.log(img);
    //when click, send request to server to change the status of the device
    axios({
      method: "post",
      baseURL: "http://localhost:3000/devices",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        ...status,
        type: status[type],
      }
    }).then((res) => {
      console.log(res.data);
      console.log('change status successfully');
      // setParameters(res.data);
    }
    );
  }
  function handleClickOff() {
    //change the color of the emoji
    //change the status
    status[type] = "Off";
    var buttons = document.getElementsByClassName("featuredBottom");
    buttons[index].classList.remove('on');
    buttons[index].classList.add('off');
    var img = document.getElementsByClassName("iconFeature")[index];
    img.style.color = emojiArray[type][1].props.style.color;
    axios({
      method: "post",
      baseURL: "http://localhost:3000/devices",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        ...status,
        type: status[type]
      }
    }).then((res) => {
      console.log(res.data);
      console.log('change status successfully');
      // setParameters(res.data);
    }
    );
  }

  return (
    <div className="featured">
      <div className="leftFeature">
        <div className="top">
          <h1 className="title">{type}</h1>
          <MoreVertIcon fontSize="small" />
        </div>
        <div className="bottom">
          <div className="featuredChart">
            {/* {emojiArray[type]} */}
            {status[type] == "On" ? emojiArray[type][0] : emojiArray[type][1]}
          </div>
          <p className="desc">
            Click the button to change the the {type}!
          </p>
        </div>
        {status[type] == 'On'?
        <div className="featuredBottom on">
          <Button className="buttonOnFeature"  onClick={handleClickOn}>On</Button>
          <Button className="buttonOffFeature" onClick={handleClickOff}>Off</Button>
        </div>
        :
        <div className="featuredBottom off">
          <Button className="buttonOnFeature"  onClick={handleClickOn}>On</Button>
          <Button className="buttonOffFeature" onClick={handleClickOff}>Off</Button>
        </div>
        }
      </div>
    </div>
  );
};

export default Featured;
