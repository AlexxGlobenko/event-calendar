import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';

export const ExpansionEvent = ({ event, onEditClick, eventKey, onDeleteClick }) => {
  const now = new Date();
  const offset = -(now.getTimezoneOffset() * 60000);
  const timeMill = Date.parse(event.time) - offset;
  const time = new Date(timeMill);
  const hours = `${time.getHours()}`.padStart(2, 0);
  const minutes = time.getMinutes().toString().padEnd(2, 0);
  return (
    <StyledExpansionPanel>
      <StyledExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="expansionPanelSummary"
      >
        <Typography>{event.title}</Typography>
        <Typography>{hours}:{minutes}</Typography>
      </StyledExpansionPanelSummary>
      <StyledExpansionPanelDetails>
        <Typography>Place: {event.place}</Typography>
        <Typography>Attendees:</Typography>
        <ul>
          {event.attendees.split(',').map((attendy) => {
            return (
              <li key={attendy}>{attendy}</li>
            )
          })}
        </ul>
        <Typography>Description: {event.description}</Typography>
        <Button
             variant="contained"
             color="primary"
             className="addEventButton"
             onClick={() => onEditClick(event, eventKey)}
          >
            Edit
        </Button>
        <Button
             variant="contained"
             color="secondary"
             className="addEventButton"
             onClick={() => onDeleteClick(eventKey)}
          >
            Delete
          </Button>
      </StyledExpansionPanelDetails>
    </StyledExpansionPanel>
  )
}

ExpansionEvent.propTypes = {
  event: PropTypes.shape().isRequired,
  onEditClick: PropTypes.func.isRequired,
  eventKey: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

const StyledExpansionPanel = styled(ExpansionPanel)`
  margin-bottom: 20px;
`;

const StyledExpansionPanelSummary = styled(ExpansionPanelSummary)`
  .MuiExpansionPanelSummary-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .addEventButton {
    margin-top: 20px;
  }
`;