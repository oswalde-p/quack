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
          <Select
            label="Time zone"
            settingsKey="secondTimeZone"
            options={[
                {name:"UTC+1 Central European"},
                {name:"UTC+10 Australian Eastern Standard"},
                {name:"UTC+10 Melbourne"},
                {name:"UTC+10 Melbourne"}
            ]}
            />
        </Section>
        <Toggle
            label="Show battery %"
            value="true"
            settingsKey="showBattery"
        />
        <Section
          title={<Text bold>Sync warning</Text>}>     
          <Toggle
              label="Show"
              value="true"
              settingsKey="showWarningMessage"
          />       
            <TextInput
                label="Warning message threshold"
                settingsKey="warningThreshold"
                type="number"
                value="35"
            />
        </Section>
      </Page>
    );
  }
  
  registerSettingsPage(settingsComponent);