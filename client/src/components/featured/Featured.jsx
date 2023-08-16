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
    "EC pump": [<FireHydrantAltIcon className="iconFeature"
      style={{ color: "rgba(0, 128, 0, 0.4)", fontSize: "130px" }}
    />,
    <FireHydrantAltIcon className="iconFeature"
      style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "130px" }}
    />],
    "PH pump": [<SanitizerOutlined className="iconFeature"
      style={{ color: "rgba(255, 0, 0, 0.4)", fontSize: "130px" }}
    />,
    <SanitizerOutlined className="iconFeature"
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

  
  
  function handleClickOn() {
    //change the color of the emoji
    //change the status
    status = "On";
    var buttons = document.getElementsByClassName("featuredBottom");
    buttons[index].classList.remove('off');
    buttons[index].classList.add('on');
    var img = document.getElementsByClassName("iconFeature")[index];
    img.style.color = emojiArray[type][0].props.style.color;
    console.log(img);
  }
  function handleClickOff() {
    //change the color of the emoji
    //change the status
    status = "Off";
    var buttons = document.getElementsByClassName("featuredBottom");
    buttons[index].classList.remove('on');
    buttons[index].classList.add('off');
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
        {status == 'On'?
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
