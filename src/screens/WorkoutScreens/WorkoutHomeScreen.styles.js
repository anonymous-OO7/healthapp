import { StyleSheet, Platform, StatusBar } from 'react-native';

// Hardcoded for consistency with your snippet, or import from your assets
const Colors = { primary: '#CD853F' };

const styles = StyleSheet.create({
  // 1. Set SafeAreaView to the Header Color (Orange)
  // This ensures the top Status Bar area is Orange
  safeArea: {
    flex: 1,
    backgroundColor: '#CD853F',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  // 2. The Fixed Header (Title + Stats)
  // Removed border radius here to make it look like a solid top bar,
  // or keep it if you want the "tab" look.
  fixedHeader: {
    backgroundColor: '#CD853F',
    paddingTop: 10, // Small padding top for spacing
    paddingBottom: 20,
    paddingHorizontal: '5%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 10, // Ensures it sits visually on top of the scrolling content
    // Shadow for depth (optional)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },

  // 3. The Container for the ScrollView
  // This takes up the rest of the screen and is White
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // We remove the top border radius visual glitch by pulling it up slightly or just letting it sit below
  },

  headerText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 22,
  },

  // Stats Styling
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 26,
  },
  statLabel: {
    color: '#EDEDED',
    fontSize: 14,
    marginTop: 4,
  },

  // Scroll Content Styling
  bannerImg: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 7,
    borderRadius: 10,
    marginTop: 20, // Margin from the bottom of the header
    marginBottom: 10,
  },
  cardsWrapper: {
    paddingHorizontal: '5%',
    paddingBottom: 20,
  },
});

export default styles;
