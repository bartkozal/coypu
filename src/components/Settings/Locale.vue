<template>
  <select v-model="select">
    <option v-for="option in options" :value="option.code">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
import sortBy from 'lodash/sortBy'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'settings-locale',
  computed: {
    ...mapGetters(['calendarLocale']),
    select: {
      get () {
        return this.calendarLocale
      },
      set (locale) {
        this.setCalendarLocale(locale)
      }
    },
    options () {
      return sortBy(this.calendars, 'name')
    }
  },
  methods: {
    ...mapMutations(['setCalendarLocale'])
  },
  data () {
    return {
      calendars: [
        {
          code: 'af',
          name: 'Afrikaans'
        },
        {
          code: 'ar-dz',
          name: 'Arabic (Algeria)'
        },
        {
          code: 'ar-ly',
          name: 'Arabic (Lybia)'
        },
        {
          code: 'ar-ma',
          name: 'Arabic (Morocco)'
        },
        {
          code: 'ar-sa',
          name: 'Arabic (Saudi Arabia)'
        },
        {
          code: 'ar-tn',
          name: 'Arabic (Tunisia)'
        },
        {
          code: 'ar',
          name: 'Arabic'
        },
        {
          code: 'az',
          name: 'Azerbaijani'
        },
        {
          code: 'bg',
          name: 'Bulgarian'
        },
        {
          code: 'be',
          name: 'Belarusian'
        },
        {
          code: 'bn',
          name: 'Bengali'
        },
        {
          code: 'bo',
          name: 'Tibetan'
        },
        {
          code: 'br',
          name: 'Breton'
        },
        {
          code: 'bs',
          name: 'Bosnian'
        },
        {
          code: 'ca',
          name: 'Catalan'
        },
        {
          code: 'cs',
          name: 'Czech'
        },
        {
          code: 'cv',
          name: 'Chuvash'
        },
        {
          code: 'cy',
          name: 'Welsh'
        },
        {
          code: 'da',
          name: 'Danish'
        },
        {
          code: 'de-at',
          name: 'German (Austria)'
        },
        {
          code: 'de',
          name: 'German'
        },
        {
          code: 'dv',
          name: 'Maldivian'
        },
        {
          code: 'el',
          name: 'Greek'
        },
        {
          code: 'en-au',
          name: 'English (Australia)'
        },
        {
          code: 'en-ca',
          name: 'English (Canada)'
        },
        {
          code: 'en-gb',
          name: 'English (United Kingdom)'
        },
        {
          code: 'en-ie',
          name: 'English (Ireland)'
        },
        {
          code: 'en-nz',
          name: 'English (New Zealand)'
        },
        {
          code: 'en',
          name: 'English (United States)'
        },
        {
          code: 'eo',
          name: 'Esperanto'
        },
        {
          code: 'es-do',
          name: 'Spanish (Dominican Republic)'
        },
        {
          code: 'es',
          name: 'Spanish'
        },
        {
          code: 'et',
          name: 'Estonian'
        },
        {
          code: 'eu',
          name: 'Basque'
        },
        {
          code: 'fi',
          name: 'Finnish'
        },
        {
          code: 'fa',
          name: 'Persian'
        },
        {
          code: 'fo',
          name: 'Faroese'
        },
        {
          code: 'fr-ca',
          name: 'French (Canada)'
        },
        {
          code: 'fr-ch',
          name: 'French (Switzerland)'
        },
        {
          code: 'fr',
          name: 'French'
        },
        {
          code: 'fy',
          name: 'Frisian'
        },
        {
          code: 'gd',
          name: 'Scottish Gaelic'
        },
        {
          code: 'gl',
          name: 'Galician'
        },
        {
          code: 'he',
          name: 'Hebrew'
        },
        {
          code: 'hi',
          name: 'Hindi'
        },
        {
          code: 'hr',
          name: 'Croatian'
        },
        {
          code: 'hu',
          name: 'Hungarian'
        },
        {
          code: 'id',
          name: 'Indonesian'
        },
        {
          code: 'hy-am',
          name: 'Armenian'
        },
        {
          code: 'it',
          name: 'Italian'
        },
        {
          code: 'is',
          name: 'Icelandic'
        },
        {
          code: 'ja',
          name: 'Japanese'
        },
        {
          code: 'jv',
          name: 'Javanese'
        },
        {
          code: 'ka',
          name: 'Georgian'
        },
        {
          code: 'kk',
          name: 'Kazakh'
        },
        {
          code: 'km',
          name: 'Cambodian'
        },
        {
          code: 'ko',
          name: 'Korean'
        },
        {
          code: 'ky',
          name: 'Kyrgyz'
        },
        {
          code: 'lo',
          name: 'Lao'
        },
        {
          code: 'lb',
          name: 'Luxembourgish'
        },
        {
          code: 'lt',
          name: 'Lithuanian'
        },
        {
          code: 'lv',
          name: 'Latvian'
        },
        {
          code: 'me',
          name: 'Montenegrin'
        },
        {
          code: 'mi',
          name: 'Maori'
        },
        {
          code: 'mk',
          name: 'Macedonian'
        },
        {
          code: 'ml',
          name: 'Malayalam'
        },
        {
          code: 'mr',
          name: 'Marathi'
        },
        {
          code: 'ms',
          name: 'Malay'
        },
        {
          code: 'my',
          name: 'Burmese'
        },
        {
          code: 'nb',
          name: 'Norwegian Bokmål'
        },
        {
          code: 'ne',
          name: 'Nepalese'
        },
        {
          code: 'nl-be',
          name: 'Dutch (Belgium)'
        },
        {
          code: 'nl',
          name: 'Dutch'
        },
        {
          code: 'nn',
          name: 'Nynorsk'
        },
        {
          code: 'pa-in',
          name: 'Punjabi (India)'
        },
        {
          code: 'pl',
          name: 'Polish'
        },
        {
          code: 'pt-br',
          name: 'Portuguese (Brazil)'
        },
        {
          code: 'pt',
          name: 'Portuguese'
        },
        {
          code: 'ro',
          name: 'Romanian'
        },
        {
          code: 'ru',
          name: 'Russian'
        },
        {
          code: 'se',
          name: 'Northern Sami'
        },
        {
          code: 'si',
          name: 'Sinhalese'
        },
        {
          code: 'sk',
          name: 'Slovak'
        },
        {
          code: 'sq',
          name: 'Albanian'
        },
        {
          code: 'sl',
          name: 'Slovenian'
        },
        {
          code: 'sr-cyrl',
          name: 'Serbian Cyrillic'
        },
        {
          code: 'sr',
          name: 'Serbian'
        },
        {
          code: 'ss',
          name: 'SiSwati'
        },
        {
          code: 'sv',
          name: 'Swedish'
        },
        {
          code: 'sw',
          name: 'Swahili'
        },
        {
          code: 'ta',
          name: 'Tamil'
        },
        {
          code: 'te',
          name: 'Telugu'
        },
        {
          code: 'tet',
          name: 'Tetun Dili (East Timor)'
        },
        {
          code: 'th',
          name: 'Thai'
        },
        {
          code: 'tl-ph',
          name: 'Tagalog (Philippines)'
        },
        {
          code: 'tlh',
          name: 'Klingon'
        },
        {
          code: 'tr',
          name: 'Turkish'
        },
        {
          code: 'tzl',
          name: 'Talossan'
        },
        {
          code: 'tzm',
          name: 'Tamazight'
        },
        {
          code: 'uk',
          name: 'Ukrainian'
        },
        {
          code: 'uz',
          name: 'Uzbek'
        },
        {
          code: 'vi',
          name: 'Vietnamese'
        },
        {
          code: 'yo',
          name: 'Yoruba Nigeria'
        },
        {
          code: 'zh-cn',
          name: 'Chinese (China)'
        },
        {
          code: 'zh-hk',
          name: 'Chinese (Hong Kong)'
        },
        {
          code: 'zh-tw',
          name: 'Chinese (Taiwan)'
        }
      ]
    }
  }
}
</script>

<style scoped>
  @import '../../defaults.css';

  select {
    width: 70%;
    padding: 4px 25px 6px 10px;
    appearance: none;
    color: white;
    border: 1px solid white;
    background-color: transparent;
    background-image: url('../../assets/bg-select.svg');
    background-repeat: no-repeat;
    background-position: center right 10px;
    font-family: var(--font-stack);
    font-size: var(--font-settings);
  }

  select:focus {
    outline: none;
  }
</style>
