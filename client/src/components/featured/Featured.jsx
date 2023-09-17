import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "react-circular-progressbar/dist/styles.css";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { SanitizerOutlined } from "@mui/icons-material";
import FireHydrantAltIcon from '@mui/icons-material/FireHydrantAlt';
import { Button } from "@mui/material";
import axios from "axios";
import  { 
  APIsystem_control 
} from "../../config"

const Featured = ({ type,title, status }) => {
  //type ="Light"
  var emojiArray = {
    "Light": [<EmojiObjectsIcon className="iconFeature"
      style={{ color: "rgb(240,230,140)", fontSize: "130px" }}
    />,
    <EmojiObjectsIcon className="iconFeature"
      style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "130px" }}
    />],
    "EcPump": [<FireHydrantAltIcon className="iconFeature"
      style={{ color: "rgba(0, 128, 0, 0.4)", fontSize: "130px" }}
    />,
    <FireHydrantAltIcon className="iconFeature"
      style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "130px" }}
    />],
    "PhPump": [<SanitizerOutlined className="iconFeature"
      style={{ color: "rgba(255, 0, 0, 0.4)", fontSize: "130px" }}
    />,
    <SanitizerOutlined className="iconFeature"
      style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "130px" }}
    />],
    "OxygenPump": [<SanitizerOutlined className="iconFeature"
      style={{ color: "rgb(25, 118, 210)", fontSize: "130px" }}
    />,
    <SanitizerOutlined className="iconFeature"
      style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "130px" }}
    />],
  }

  var index = Object.keys(emojiArray).indexOf(type);

  
  
  async function handleClickOn() {
    try {
      status[type] = "On";
      var buttons = document.getElementsByClassName("featuredBottom");
      buttons[index].classList.remove('off');
      buttons[index].classList.add('on');
      var img = document.getElementsByClassName("iconFeature")[index];
      img.style.color = emojiArray[type][0].props.style.color;
      // Send the POST request to turn on the device
      await axios({
        method: "post",
        baseURL: APIsystem_control,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          ActionName: `TurnOn${type}`,
        },
      })
      
    } catch (error) {
      // If the request fails, handle the error (e.g., display an error message)
      console.error("Failed to turn on device:", error);
  
      // Revert the color and status back to "Off"
      status[type] = "Off";
      buttons[index].classList.remove('on');
      buttons[index].classList.add('off');
      img.style.color = emojiArray[type][1].props.style.color;
    }
  }
  
  async function handleClickOff() {
    try {
      status[type] = "Off";
      var buttons = document.getElementsByClassName("featuredBottom");
      buttons[index].classList.remove('on');
      buttons[index].classList.add('off');
      var img = document.getElementsByClassName("iconFeature")[index];
      img.style.color = emojiArray[type][1].props.style.color;
      // Send the POST request to turn off the device
      await axios({
        method: "post",
        baseURL: APIsystem_control,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          ActionName: `TurnOff${type}`,
        },
      });
      
    } catch (error) {
      // If the request fails, handle the error (e.g., display an error message)
      console.error("Failed to turn off device:", error);
  
      // Revert the color and status back to "On"
      status[type] = "On";
      buttons[index].classList.remove('off');
      buttons[index].classList.add('on');
      img.style.color = emojiArray[type][0].props.style.color;
    }
  }
  

  return (
    <div className="featured">
      <div className="leftFeature">
        <div className="top">
          <h1 className="title">{title}</h1>
          <MoreVertIcon fontSize="small" />
        </div>
        <div className="bottom">
          <div className="featuredChart">
            {/* {emojiArray[type]} */}
            {status[type] == "On" ? emojiArray[type][0] : emojiArray[type][1]}
          </div>
          <p className="desc">
            Click the button to change the the {title}!
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
