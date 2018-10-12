import React from 'react'
import { View, Button } from 'react-native';
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
    <View>
        <View style={{flexDirection: "row"}}>
            <Button 
                onPress={onUndo.bind(this)} 
                disabled={!canUndo}
                title="Undo"
                color="red"
            />
            <Button 
                onPress={onRedo.bind(this)} 
                disabled={!canRedo}
                title="Redo"
                color="red"
            />
        </View>
    </View>
)

function mapStateToProps(state){
    console.log("state.tasks.past", state.tasks.past)
    console.log("state.tasks.present", state.tasks.present)
    console.log("state.tasks.future", state.tasks.future)
    return {
        canUndo: state.tasks.past > 0,
        canRedo: state.tasks.future > 0
    }
}

const mapDispatchToProps = ({
    onUndo: UndoActionCreators.undo,
    onRedo: UndoActionCreators.redo
})

UndoRedo = connect(mapStateToProps, mapDispatchToProps)(UndoRedo)

export default UndoRedo