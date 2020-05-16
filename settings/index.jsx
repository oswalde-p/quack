import { gettext } from 'i18n'

import { SETTINGS_EVENTS as EVENTS } from '../common/constants'

function settingsComponent() {
  return (
    <Page>
      <Section
        title={<Text bold>{gettext('title-clock-color')}</Text>}>
        <ColorSelect
          label={gettext('label-clock-color')}
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
          label={gettext('label-custom-color')}
          settingsKey={EVENTS.PRIMARY_COLOR_CUSTOM}
        />
        <Text>{gettext('description-custom-color')}</Text>

      </Section>
      <Section
        title={<Text bold>Secondary time</Text>}>
        <Toggle
          label={gettext('label-show-second-time')}
          settingsKey={EVENTS.SHOW_SECOND_TIME}
        />
        <TextInput
          label={gettext('label-second-time-offset-hours')}
          settingsKey={EVENTS.SECOND_TIME_OFFSET}
          type="number"
        />
      </Section>
      <Toggle
        label={gettext('label-show-battery')}
        settingsKey={EVENTS.SHOW_BATTERY_STATUS}
      />
      <Section
        title={<Text bold>{gettext('title-sync-warning')}</Text>}>
        <Toggle
          label={gettext('label-show-sync-warning')}
          settingsKey={EVENTS.SHOW_SYNC_WARNING}
        />
        <TextInput
          label={gettext('label-sync-threshold')}
          settingsKey={EVENTS.SYNC_WARNING_THRESHOLD}
          type="number"
        />
      </Section>
      <Section
        title={<Text bold>{gettext('title-advanced')}</Text>}>
        <Select
          label={gettext('label-clock-display')}
          settingsKey={EVENTS.CLOCK_DISPLAY}
          options={[
            { name: gettext('option-time-default'), value: 'default' },
            { name: gettext('option-time-12h'), value: '12h' },
            { name: gettext('option-time-24h'), value: '24h' }
          ]}
        />
      </Section>
    </Page>
  )
}

registerSettingsPage(settingsComponent) //eslint-disable-line no-undef
