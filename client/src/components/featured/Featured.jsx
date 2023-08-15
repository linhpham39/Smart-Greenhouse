import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "react-circular-progressbar/dist/styles.css";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { SanitizerOutlined } from "@mui/icons-material";
import FireHydrantAltIcon from '@mui/icons-material/FireHydrantAlt';
import { Button } from "@mui/material";
import Chart from "../chart/Chart";

const Featured = ({ type, status }) => {
  //type ="Light"
  var emojiArray = {
    "Light": [<EmojiObjectsIcon className="iconFeature"
      style={{ color: "rgb(240,230,140)", fontSize: "130px" }}
    />,
    <EmojiObjectsIcon className="iconFeature"
      style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "130px" }}
    />],
    "PH pump": [<SanitizerOutlined className="iconFeature"
      style={{ color: "rgba(255, 0, 0, 0.4)", fontSize: "130px" }}
    />,
    <SanitizerOutlined className="iconFeature"
      style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "130px" }}
    />],
    "EC pump": [<FireHydrantAltIcon className="iconFeature"
      style={{ color: "rgba(0, 128, 0, 0.4)", fontSize: "130px" }}
    />,
    <FireHydrantAltIcon className="iconFeature"
      style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "130px" }}
    />],
    "Oxi pump": [<SanitizerOutlined className="iconFeature"
      style={{ color: "rgb(25, 118, 210)", fontSize: "130px" }}
    />,
    <SanitizerOutlined className="iconFeature"
      style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "130px" }}
    />],
  }
  var index = Object.keys(emojiArray).indexOf(type);
  console.log('featured:',index);
  document.addEventListener("DOMContentLoaded", function() {
    var buttonOn = document.getElementsByClassName("buttonOnFeature");
    var buttonOff = document.getElementsByClassName("buttonOffFeature");
    // console.log('on',buttonOn[index]);
    if(status == "On"){
      buttonOn[index].style.backgroundColor = "rgba(0, 128, 0, 0.2)";
      buttonOff[index].style.backgroundColor = "rgba(0, 0, 0, 0)";
    }else{
      buttonOn[index].style.backgroundColor = "rgb(255, 255, 255)";
      buttonOff[index].style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    }
  });

  
  
  function handleClickOn() {
    //change the color of the emoji
    //change the status
    status = "On";
    var buttonOn = document.getElementsByClassName("buttonOnFeature");
    var buttonOff = document.getElementsByClassName("buttonOffFeature");
    buttonOn[index].style.backgroundColor = "rgba(0, 128, 0, 0.2)";
    buttonOff[index].style.backgroundColor = "rgba(0, 0, 0, 0)";
    var img = document.getElementsByClassName("iconFeature")[index];
    img.style.color = emojiArray[type][0].props.style.color;
    console.log(img);
  }
  function handleClickOff() {
    //change the color of the emoji
    //change the status
    status = "Off";
    var buttonOn = document.getElementsByClassName("buttonOnFeature");
    var buttonOff = document.getElementsByClassName("buttonOffFeature");
    buttonOn[index].style.backgroundColor = "rgb(255, 255, 255)";
    buttonOff[index].style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    var img = document.getElementsByClassName("iconFeature")[index];
    img.style.color = emojiArray[type][1].props.style.color;
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
            {status == "On" ? emojiArray[type][0] : emojiArray[type][1]}
          </div>
          <p className="desc">
            Click the button to change the the {type}!
          </p>
        </div>
        <div className="featuredBottom">
          <Button className="buttonOnFeature"  onClick={handleClickOn}>On</Button>
          <Button className="buttonOffFeature" onClick={handleClickOff}>Off</Button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
