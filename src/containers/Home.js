import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const Home = (props) => {
  return (
    <div>Home</div>
  )
}

Home.propTypes = {
  second: PropTypes.third
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)