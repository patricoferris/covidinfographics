import React from 'react';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

const Accordion = ({ names, items }) => {
  const [expanded, setExpanded] = React.useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div>    
      {items.map((item, idx) => {
        return (
          <MuiExpansionPanel square expanded={expanded === idx} onChange={handleChange(idx)}>
            <MuiExpansionPanelSummary aria-controls={`panel${idx}d-content`} id={`panel${idx}d-header`}>
            <Typography>{names[idx]}</Typography>
            </MuiExpansionPanelSummary>
            <MuiExpansionPanelDetails>
              {item}
            </MuiExpansionPanelDetails>
        </MuiExpansionPanel>
        )
      })}
    </div>
  )
}

export default Accordion