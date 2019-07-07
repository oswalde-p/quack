function settingsComponent() {
  return (
    <Page>
      <Section
        title={<Text bold>Clock colour</Text>}>
        <ColorSelect
          label="Clock colour"
          settingsKey="primaryColor"
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
          settingsKey="primaryColorCustom"
        />
        <Text>You may enter a custom hex colour (eg #783c94) here. This will be used instead of the colour selected above.</Text>

      </Section>
      <Section
        title={<Text bold>Secondary time</Text>}>
        <Toggle
          label="Show"
          value="true"
          settingsKey="showSecondTime"
        />
        <TextInput
          label="Time Offset (h)"
          settingsKey="secondTimeOffset"
          type="number"
        />
      </Section>
      <Toggle
        label="Show battery %"
        value="true"
        settingsKey="showBatteryStatus"
      />
      <Section
        title={<Text bold>Sync warning</Text>}>
        <Toggle
          label="Show"
          value="true"
          settingsKey="showWarning"
        />
        <TextInput
          label="Threshold (minutes, default = 40)"
          settingsKey="warningThreshold"
          type="number"
        />
      </Section>
    </Page>
  )
}

registerSettingsPage(settingsComponent) //eslint-disable-line no-undef
