function settingsComponent(props) {
  return (
    <Page>
      <Section
        title={<Text bold>Clock colour</Text>}>
        <ColorSelect
          label="Clock colour"
          settingsKey="primaryColor"
          colors={[
            {color: 'tomato'},
            {color: '#783c94'},
            {color: 'sandybrown'},
            {color: 'gold'},
            {color: 'aquamarine'},
            {color: 'deepskyblue'},
            {color: 'plum'}
          ]}
        />
        <TextInput
          label="Custom colour"
          settingsKey="primaryColorCustom"
          placeholder={props.settings.primaryColor}
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
          label="Warning message threshold (minutes)"
          settingsKey="warningThreshold"
          type="number"
        />
      </Section>
    </Page>
  )
}

registerSettingsPage(settingsComponent) //eslint-disable-line no-undef
