import { SETTINGS_EVENTS as EVENTS } from '../common/constants'

function settingsComponent() {
  return (
    <Page>
      <Section
        title={<Text bold>Clock colour</Text>}>
        <ColorSelect
          label="Clock colour"
          settingsKey={EVENTS.PRIMARY_COLOR}
          colors={[
            {color: '#783c94'},
            {color: '#ff4d88'},
            {color: 'deepskyblue'},
            {color: '#0000cc'},
            {color: '#007700'},
            {color: '#ffcc00'},
            {color: '#800000'},
            {color: '#e6e6e6'}
          ]}
        />
        <TextInput
          label="Custom colour"
          settingsKey={EVENTS.PRIMARY_COLOR_CUSTOM}
        />
        <Text>You may enter a custom hex colour (eg #783c94) here. This will be used instead of the colour selected above.</Text>

      </Section>
      <Section
        title={<Text bold>Secondary time</Text>}>
        <Toggle
          label="Show"
          settingsKey={EVENTS.SHOW_SECOND_TIME}
        />
        <TextInput
          label="Time Offset (h)"
          settingsKey={EVENTS.SECOND_TIME_OFFSET}
          type="number"
        />
      </Section>
      <Toggle
        label="Show battery %"
        settingsKey={EVENTS.SHOW_BATTERY_STATUS}
      />
      <Section
        title={<Text bold>Sync warning</Text>}>
        <Toggle
          label="Show"
          settingsKey={EVENTS.SHOW_SYNC_WARNING}
        />
        <TextInput
          label="Threshold (minutes, default = 40)"
          settingsKey={EVENTS.SYNC_WARNING_THRESHOLD}
          type="number"
        />
      </Section>
      <Section
        title={<Text bold>Advanced</Text>}>
        <Select
          label="Clock Display Time"
          settingsKey={EVENTS.CLOCK_DISPLAY}
          options={[
            { name: 'Use Fitbit profile setting (default)'},
            { name: '12h' },
            { name: '24h' }
          ]}
        />
      </Section>
    </Page>
  )
}

registerSettingsPage(settingsComponent) //eslint-disable-line no-undef
