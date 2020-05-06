import React from 'react'
import _ from 'lodash'

import './Sidebar.scss'

import PathLink from '../PathLink/PathLink'
import GlobalMenu from '../GlobalMenu/GlobalMenu'

class MessageElement extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { path } = this.props
    return (
      !_.isEqual(path, nextProps.path)
    )
  }

  render() {
    const { path } = this.props
    return (
      <li className={`item item-message ${path.isValid ? '' : 'invalid'}`}>
        <PathLink path={path} />
      </li>
    )
  }
}

class CollectionElement extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { path } = this.props
    const should = (
      !_.isEqual(path, nextProps.path)
    )
    return should
  }

  render() {
    const { path } = this.props
    return (
      <li className='item item-collection'>
        <PathLink path={path} />
      </li>
    )
  }
}

class Iterator extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { paths } = this.props
    const should = (
      !_.isEqual(paths, nextProps.paths)
    )
    return should
  }

  render() {
    const { paths } = this.props

    return (
      <ul>
        {
          paths.map((path) => {
            if(path.type === 'message') {
              return <MessageElement path={path} />
            } else if (path.type === 'collection') {
              return <CollectionElement path={path} />
            }
            return null
          })
        }
      </ul>
    )
  }
}

class Sidebar extends React.PureComponent {
  render() {
    return (
      <aside className="sidebar">
        <GlobalMenu {...this.props} />
        <div className='iterator'>
          <Iterator {...this.props} />
        </div>
      </aside>
    )
  }
}

/*
class Iterator extends React.Component {

  constructor(props) {
    super(props)
    this.onString = this.onString.bind(this)
    this.onObject = this.onObject.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    const { paths, structure } = this.props
    const should = (
      !_.isEqual(paths, nextProps.paths)
      || !_.isEqual(structure, nextProps.structure)
    )
    return should
  }

  onString (path, value) {

    const { paths } = this.props
    const pathData = paths.find((pathEval) => pathEval.str === pathString(path))
    return (
      <MessageElement key={pathData.name} path={pathData} />
    )
  }

  onObject (path, value, deeper) {

    const { paths } = this.props

    const content = deeper ? deeper() : null
    if (path.length) {
      const pathData = paths.find((pathEval) => pathEval.str === pathString(path))
      return (
        <CollectionElement key={pathData.name} path={pathData} content={content} />
      )
    } else { // root element
      const pathData = {
        type: 'collection',
        str: '',
        id: 'root',
        arr: [],
        name: 'Root'
      }
      return (
        <CollectionElement path={pathData} content={content} />
      )
    }
  }

  parse (base) { 
    return iterate(base, this.onString, this.onObject)
  }

  render() {
    const { structure } = this.props

    return (
      <ul>
        {this.parse(structure)}
      </ul>
    )
  }
}

class Sidebar extends React.PureComponent {
  render() {
    return (
      <aside className="sidebar">
        <GlobalMenu {...this.props} />
        <div className='iterator'>
          <Iterator {...this.props} />
        </div>
      </aside>
    )
  }
}
*/

export default Sidebar
