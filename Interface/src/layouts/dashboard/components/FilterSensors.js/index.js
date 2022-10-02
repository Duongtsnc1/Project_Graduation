import React,{useState} from "react";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Popover, Menu, Icon, Checkbox } from "@mui/material";
import PropTypes from "prop-types";

const FilterSensors = ({ sensors, onChangeFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickFilter = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const handleCheck = (key) => {
    let tempChecked = [...sensors];
    if (tempChecked.filter((item) => item.show).length === 1) return;
    let index = tempChecked.findIndex((item) => item.title === key);
    tempChecked[index].show = !tempChecked[index].show;
    onChangeFilter(tempChecked);
  };

  return (
    <ArgonBox pr={1}>
      <ArgonButton variant="text" color="primary" onClick={handleClickFilter}>
        Show/Hide sensor {Boolean(anchorEl) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </ArgonButton>
      <Popover
        id="simple-popper"
        open={Boolean(anchorEl)}
        onClose={handleCloseFilter}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            padding: "10px",

            boxShadow: "5px 5px 10px #000",
            backgroundColor: "#fff",
          },
        }}
        disableAutoFocus
        disableRestoreFocus
      >
        <div
          style={{
            color: "#11cdef",
            padding: "5px",
            maxHeight: "400px",
            overflowY: "scroll",
          }}
        >
          <div>
            {sensors.map((value, index) => (
              <div key={index}>
                <Checkbox checked={value.show} onClick={() => handleCheck(value.title)} />
                {value.title}
              </div>
            ))}
          </div>
        </div>
      </Popover>
    </ArgonBox>
  );
};

FilterSensors.propTypes = {
  onChangeFilter: PropTypes.any,
  sensors: PropTypes.any,
};

export default FilterSensors;
