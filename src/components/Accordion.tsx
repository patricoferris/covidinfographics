import React from 'react'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

interface AccordionProps {
  names: string[]
  items: unknown[]
}

const Accordion: React.SFC<AccordionProps> = ({ names, items }) => {
  const [expanded, setExpanded] = React.useState(0)

  const handleChange = (panel) => (_event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div>
      {items.map((item, idx) => {
        return (
          <Paper key={idx} elevation={1}>
            <MuiExpansionPanel square expanded={expanded === idx} onChange={handleChange(idx)}>
              <MuiExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${idx}d-content`}
                id={`panel${idx}d-header`}
              >
                <Typography>{names[idx]}</Typography>
              </MuiExpansionPanelSummary>
              <MuiExpansionPanelDetails>{item}</MuiExpansionPanelDetails>
            </MuiExpansionPanel>
          </Paper>
        )
      })}
    </div>
  )
}

export default Accordion
