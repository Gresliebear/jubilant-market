import React from 'react'
import Timeline from 'react-timelines'
import 'react-timelines/lib/css/style.css'
import { fill, hexToRgb, colourIsLight, addMonthsToYear, addMonthsToYearAsDate, nextColor, randomTitle } from './utils'
// import { buildTimebar, buildTrack } from './builders'
// import testConfig from './JSON/TEST_CONFIG.json'

    //so we need to define vars
        //fill
        // hextoRgb
        // addMonthsToYear
        // addMonthsToYearAsDate
        //nextColor
        //randomTitle 
          //https://www.npmjs.com/package/timelinejs3
    // Dynamic timeline to write code tto create or update your timeline
    // how to format the data
    // events Required 

    // due date
    // const now = new Date('2021-10-03')

    // Async function to view data from smart contract 
    var d = new Date();
    var n = d.getYear();
    const START_YEAR = n
    const NUM_OF_YEARS = 1
    const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const MONTHS_PER_YEAR = 12
    const NUM_OF_MONTHS = NUM_OF_YEARS * MONTHS_PER_YEAR
    const MAX_TRACK_START_GAP = 4
    const MAX_ELEMENT_GAP = 8
    const MAX_MONTH_SPAN = 8
    const MIN_MONTH_SPAN = 2
    const NUM_OF_TRACKS = 1
    const MAX_NUM_OF_SUBTRACKS = 0
    const start = new Date(`${START_YEAR}`)
    const end = new Date(`${START_YEAR + NUM_OF_YEARS}`)
    const MIN_ZOOM = 2
    const MAX_ZOOM = 20 
    const buildElementGap = () => Math.floor(Math.random() * MAX_ELEMENT_GAP)


    const buildElement = ({ trackId, start, end, i }) => {
        const bgColor = nextColor()
        const color = colourIsLight(...hexToRgb(bgColor)) ? '#000000' : '#ffffff'
        return {
          id: `t-${trackId}-el-${i}`,
          title: randomTitle(),
          start,
          end,
          style: {
            backgroundColor: `#${bgColor}`,
            color,
            borderRadius: '4px',
            boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
            textTransform: 'capitalize',
          },
        }
      }
      

    const buildElements = trackId => {
      var d = new Date();
      var n = d.getMonth();

        const v = []
        let i = 1
        let month = n // month set to zero? indexed array dumby
      
        // Write this to visually fix the time line

        while (month < NUM_OF_MONTHS) {
          // we need month Span from the start date to end date
          let monthSpan = 12
      
          if (month + monthSpan > NUM_OF_MONTHS) {
            monthSpan = NUM_OF_MONTHS - month
          }
      
          const start = addMonthsToYearAsDate(START_YEAR, month)
          const end = addMonthsToYearAsDate(START_YEAR, month + monthSpan)
          // the start & end is determined above but push to this v array?
          v.push(
            buildElement({
              trackId,
              start,
              end,
              i,
            })
          )
          
          month += monthSpan 
          i += 1
        }
      
        return v
      }


 const buildSubtrack = (trackId, subtrackId) => ({
        id: `track-${trackId}-${subtrackId}`,
        title: `Subtrack ${subtrackId}`,
        elements: buildElements(subtrackId),
      })
      

   
  
  const buildMonthCells = () => {
    const v = []
    for (let i = 0; i < MONTHS_PER_YEAR * NUM_OF_YEARS; i += 1) {
      const startMonth = i
      const start = addMonthsToYearAsDate(START_YEAR, startMonth)
      const end = addMonthsToYearAsDate(START_YEAR, startMonth + 1)
      v.push({
        id: `m${startMonth}`,
        title: MONTH_NAMES[i % 12],
        start,
        end,
      })
    }
    return v
  }

  // timebar css????
    const buildTimebar = () => [
        {
          id: 'months',
          cells: buildMonthCells(),
          useAsGrid: true,
          style: {},
        },
      ]
    const buildTrack = trackId => {
        const tracks = fill(Math.floor(Math.random() * MAX_NUM_OF_SUBTRACKS) + 1).map(i => buildSubtrack(trackId, i + 1))
        return {
          id: `track-${trackId}`,
          title: `Track ${trackId}`,
          elements: buildElements(trackId),
          tracks,
          // hasButton: true,
          // link: 'www.google.com',
          isOpen: false,
        }
      }
    // Slide objects
        // start_date is required
        //
    // Scale - Human when the Smart Contract was initialized

    // SQL 
        //ID
        // title
        // description
        // buttonText
        //date 

    // clickElement allows us to pass information on transaction
    const clickElement = element => alert(`Clicked element\n${JSON.stringify(element, null, 2)}`)

    //
    
    //const timebar = buildTimebar()
    const timebar = buildTimebar()

class Insurancetimeline extends React.Component{
    
    constructor(props) {
        super(props)
    
        const tracksById = fill(NUM_OF_TRACKS).reduce((acc, i) => {
          const track = buildTrack(i + 1)
          acc[track.id] = track
          return acc
        }, {})
    
        this.state = {
          open: false,
          zoom: 2,
          // eslint-disable-next-line react/no-unused-state
          tracksById,
          tracks: Object.values(tracksById),
        }
      }
  
    render() {
        const { open, zoom, tracks } = this.state
        const start = new Date(`${START_YEAR}`)
        const end = new Date(`${START_YEAR + NUM_OF_YEARS}`)
        
        return (
            <div className="timebox">
                <h3> Smart Contract Policy - 1 Year Life Span  </h3>
                <Timeline
          scale={{
            start,
            end,
            zoom,
            zoomMin: MIN_ZOOM,
            zoomMax: MAX_ZOOM,
          }}
          isOpen={open}
          toggleOpen={this.handleToggleOpen}
          zoomIn={this.handleZoomIn}
          zoomOut={this.handleZoomOut}
          clickElement={clickElement}
          clickTrackButton={track => {
            // eslint-disable-next-line no-alert
            alert(JSON.stringify(track))
          }}
          timebar={timebar}
          tracks={tracks}
          
          enableSticky
          scrollToNow
        />
            </div>
        )
    }
}

export default Insurancetimeline
