import { mount } from 'enzyme'
import React from 'react'
import TaskRuns from '../../../components/JobRuns/TaskRuns'
import { TaskRun } from 'explorer/models'

const etherscanHost = 'ropsten.etherscan.io'

describe('components/JobRuns/TaskRuns', () => {
  it('hides incoming pending confirmations with NO confirmations', () => {
    const taskRuns: TaskRun[] = [
      {
        id: 1,
        status: 'completed',
        type: 'httpget',
      },
    ]

    const wrapper = mount(
      <TaskRuns taskRuns={taskRuns} etherscanHost={etherscanHost} />,
    )
    expect(wrapper.text()).not.toContain('pending confirmations')
  })

  it('displays incoming pending confirmations with 0/3 pending confirmations', () => {
    const taskRuns: TaskRun[] = [
      {
        confirmations: '0',
        id: 1,
        minimumConfirmations: '3',
        status: 'completed',
        type: 'httpget',
      },
    ]

    const wrapper = mount(
      <TaskRuns taskRuns={taskRuns} etherscanHost={etherscanHost} />,
    )
    expect(wrapper.text()).toContain('pending confirmations')
    expect(wrapper.text()).toContain('0')
    expect(wrapper.text()).toContain('3')
  })

  it('displays incoming pending confirmations with 1/3 pending confirmations', () => {
    const taskRuns: TaskRun[] = [
      {
        confirmations: '1',
        id: 1,
        minimumConfirmations: '3',
        status: 'completed',
        type: 'httpget',
      },
    ]

    const wrapper = mount(
      <TaskRuns taskRuns={taskRuns} etherscanHost={etherscanHost} />,
    )
    expect(wrapper.text()).toContain('pending confirmations')
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('3')
  })

  it('does not display repeated pending confirmations', () => {
    const taskRuns: TaskRun[] = [
      {
        confirmations: '3',
        id: 1,
        minimumConfirmations: '3',
        status: 'completed',
        type: 'httpget',
      },
      {
        confirmations: '3',
        id: 2,
        minimumConfirmations: '3',
        status: 'completed',
        type: 'jsonparse',
      },
    ]

    const wrapper = mount(
      <TaskRuns taskRuns={taskRuns} etherscanHost={etherscanHost} />,
    )
    const pendingConfs = wrapper.text().match(/pending confirmation/g)
    expect(pendingConfs).toHaveLength(1)
  })

  it('does display increasing pending confirmations', () => {
    const taskRuns: TaskRun[] = [
      {
        confirmations: '3',
        id: 1,
        minimumConfirmations: '3',
        status: 'completed',
        type: 'httpget',
      },
      {
        confirmations: '4',
        id: 2,
        minimumConfirmations: '5',
        status: 'completed',
        type: 'jsonparse',
      },
    ]

    const wrapper = mount(
      <TaskRuns taskRuns={taskRuns} etherscanHost={etherscanHost} />,
    )
    const pendingConfs = wrapper.text().match(/pending confirmation/g)
    expect(pendingConfs).toHaveLength(2)
  })
})
