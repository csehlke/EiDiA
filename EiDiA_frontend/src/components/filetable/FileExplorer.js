import React from 'react';
import Element from './Element'
import styled from "styled-components";
import ElementDropTarget from "./ElementDropTarget";
import {databaseEntriesPlaceholder, fileTypes} from "../../assets/Constants";

const ElementBoundary = styled.div`
    height: auto;
`;

/**
 * TODO:
 * - Cant drag files to toplevel at the moment
 * - Design DnD operations
 */
export default class FileExplorer extends React.Component {

    constructor(props) {
        super(props);
        databaseEntriesPlaceholder.forEach(element => element.active = false);
        this.state = {
            elements: databaseEntriesPlaceholder,
        }
    }

    setNewParent = (child) => (newParentId) => {
        child.parentId = newParentId;

        this.setState(this.state);
    }
    activeToggle = (element) => () => {
        element.active === true ?
            element.active = false :
            element.active = true;
        this.setState(this.state);
    }

    renderElement(element, index, level) {
        return (
            <ElementDropTarget key={index}
                               type={element.type}
                               id={element.id}>
                <Element
                    level={level}
                    elementData={element}
                    handleDrop={this.setNewParent(element)}
                    activeToggle={this.activeToggle(element)}>

                    {element.active === true ?
                        this.state.elements.map((child, indexChild) =>
                            child.parentId === element.id ? this.renderElement(child, indexChild, level + 1) : null
                        ) : null
                    }

                </Element>
            </ElementDropTarget>
        );
    }

    render() {
        return (
            <ElementBoundary>

                {/**
                 *TODO: Add Header for File Explorer
                 * */}
                {/*
                <Element level={0}
                         type={fileTypes.NONE}
                         name={'Name'}
                         dateCreation={'Date'}
                         dateModification={'Last Modified'}
                         comment={'Comment'}
                         actions={['HEADING']}/>*/}
                <hr/>
                <ElementDropTarget id={0} type={fileTypes.FOLDER}>
                    {this.state.elements.map((element, index) => element.parentId === 0 ?
                        this.renderElement(element, index, 0) : null
                    )}
                </ElementDropTarget>

            </ElementBoundary>
        );
    }
}
